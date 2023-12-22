import { BadRequestException, Injectable, Optional } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Formation } from './formation.entity';
import { CreateFormationDto } from './dto/createformation.dto';
import { ProfRepository } from 'src/Prof/prof.repository';
import { ModifyFormationDto } from './dto/modifyformation.dto';
import { SeanceRepository } from 'src/seance/seance.repository';
import { SeanceService } from 'src/seance/seance.service';
import { Seance } from 'src/Seance/seance.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FormationRepository extends Repository<Formation> {
  constructor(
    dataSource: DataSource,
    private readonly profRepository: ProfRepository,
    @Optional()
    @InjectRepository(Seance)
    private readonly seanceRepository?: SeanceRepository,
  ) {
    super(Formation, dataSource.createEntityManager());
  }

  async getFormation(formationId: number): Promise<Formation> {
    const formation = await this.findOne({
      where: { id: formationId },
      relations: ['prof', 'seance', 'reviews'], // Include relations
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
    const prof = await this.profRepository.findOne({
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
    modifyFormationDto: ModifyFormationDto,
  ): Promise<Formation> {
    const formation = await this.findOne({
      where: { id: FormationId },
      relations: ['prof', 'seance', 'reviews'],
    });

    if (!formation) {
      throw new BadRequestException('Formation not found');
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

  async deleteFormation(formationId: number) {
    const formation = await this.findOne({
      where: { id: formationId },
      relations: ['seance'],
    });

    if (formation.seance && formation.seance.length > 0) {
      await Promise.all(
        formation.seance.map(async (seance) => {
          await this.seanceRepository.remove(seance); // Adjust this line according to your entity setup
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

  async getAll() {
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
