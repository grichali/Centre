import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Formation } from './formation.entity';
import { CreateFormationDto } from './dto/createformation.dto';
import { ProfRepository } from 'src/Prof/prof.repository';
import { ModifyFormationDto } from './dto/modifyformation.dto';
 


@Injectable()
export class FormationRepository extends Repository<Formation> {
  constructor(
    dataSource: DataSource,
    private readonly profRepository: ProfRepository,
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
    });

    if (!formation) {
      throw new BadRequestException('Formation not found !');
    }
    try {
      await this.remove(formation);
    } catch (error) {
      console.error('Error deleting Formation:', error);
      throw new BadRequestException('Failed to delete Formation');
    }
  }
}
