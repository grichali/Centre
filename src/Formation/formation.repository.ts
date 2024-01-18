/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Optional } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Formation } from './formation.entity';
import { CreateFormationDto } from './dto/createformation.dto';
import { ProfRepository } from 'src/Prof/prof.repository';
import { ModifyFormationDto } from './dto/modifyformation.dto';
import { SeanceRepository } from 'src/seance/seance.repository';
import { Seance } from 'src/Seance/seance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Prof } from 'src/Prof/prof.entity';

@Injectable()
export class FormationRepository extends Repository<Formation> {
  constructor(
    private dataSource: DataSource,

  ) {
    super(Formation, dataSource.createEntityManager());
  }


  async isFormationFinished(formationId: number): Promise<boolean> {
  const formation = await this.findOne({
    where: { id: formationId },
    relations: ['seance'],
  });

  if (!formation) {
    throw new BadRequestException('Formation not found');
  }

  const hasUpcomingSeances = formation.seance.some(seance => {
    const seanceDate = new Date(seance.date);

    return seanceDate > new Date();
  });

  return !hasUpcomingSeances;
}

  async getFormation(formationId: number): Promise<Formation> {
    const formation = await this.findOne({
      where: { id: formationId },
      relations: ['prof', 'seance', 'reviews'],
    });

    if (!formation) {
      throw new BadRequestException('Formation not found');
    }

    return formation;
  }

  async createFormation(
    createFormationDto: CreateFormationDto,
    profId: number,
  ): Promise<Formation> {
    const { Type, prix, description } = createFormationDto;

    const id = profId;
    const ProfRepository = await this.dataSource.getRepository(Prof);
    const prof = await ProfRepository.findOne({
      where: { id },
    });
    if (!prof) {
      throw new BadRequestException('Prof not found');
    }

    const formation = new Formation();
    formation.Type = Type;
    formation.prix = prix;
    formation.description = description;
    formation.prof = prof;

    try {
      await this.save(formation);
      return formation;
    } catch (error) {
      console.log('Error creating Formation:', error);
    }
  }
  async modifyFormation(
    FormationId: number,
    profId: number,
    modifyFormationDto: ModifyFormationDto,
  ): Promise<Formation> {
    const id = profId;
    const ProfRepository = await this.dataSource.getRepository(Prof);
    const prof = await ProfRepository.findOne({
      where: { id },
    });
    if (!prof) {
      throw new BadRequestException('Prof not found');
    }
    const formation = await this.findOne({
      where: { id: FormationId },
      relations: ['prof', 'seance', 'reviews'],
    });

    if (!formation) {
      throw new BadRequestException('Formation not found');
    }
    if (formation.prof.id !== profId) {
      throw new BadRequestException('Formation does not belong to the specified Prof');
    }

    if (modifyFormationDto.Type !== undefined) {
      formation.Type = modifyFormationDto.Type;
    }

    if (modifyFormationDto.prix !== undefined) {
      formation.prix = modifyFormationDto.prix;
    }

    if (modifyFormationDto.description !== undefined) {
      formation.description = modifyFormationDto.description;
    }

    try {
      await this.save(formation);
      return formation;
    } catch (error) {
      console.error('Error modifying Formation:', error);
      throw new BadRequestException('Failed to modify Formation');
    }
  }

  async deleteFormation(formationId: number,profId:number) {
    const formation = await this.findOne({
      where: { id: formationId },
      relations: ['seance','prof'],
    });
   /* if (formation.prof.id !== profId) {
      throw new BadRequestException('Formation does not belong to the specified Prof');
    }*/
    const SeanceRepository = await this.dataSource.getRepository(Seance)
    if (formation.seance && formation.seance.length > 0) {
      await Promise.all(
        formation.seance.map(async (seance) => {
          await SeanceRepository.remove(seance);
        }),
      );
    }
    try {
      await this.remove(formation);
    } catch (error) {
      console.error('Error deleting Formation:', error);
      throw new BadRequestException('Failed to delete Formation');
    }
  }

async getAvailableFormation(): Promise<Formation[]> {
  const formations = await this.getAll();
  const available: Formation[] = [];
  for (const formation of formations) {
    if (!await this.isFormationFinished(formation.id)) {
      available.push(formation);
    }
  }
  return available;
}


  async getAll() :  Promise<Formation[]> {
    return await this.find({
      relations: ['prof', 'seance', 'seance.salle', 'seance.salle.centre'],
      // filtring what data to return
      select: {
        id: true,
        Type: true,
        prix: true,
        description: true,
        prof: {
          id: true,
          nom: true,
          prenom: true,
          description: true,
        },
        seance: {
          id: true,
          titre: true,
          date: true,
          time: true,
          duration: true,
          description: true,
          placeDisponible: true,
          salle: {
            id: true,
            description: true,
            centre: {
              id: true,
              nom: true,
              prenom: true,
              adresse: true,
              description: true,
            },
          },
        },
      },
    });
  }
}
