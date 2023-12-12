import { Injectable } from '@nestjs/common';
import { FormationRepository } from './formation.repository';
import { CreateFormationDto } from './dto/createformation.dto';
import { ModifyFormationDto } from './dto/modifyformation.dto';

@Injectable()
export class FormationService {
  constructor(private readonly formationRepository: FormationRepository) {}

  async createFormation(createFormationDto: CreateFormationDto, id) {
    return await this.formationRepository.createFormation(
      createFormationDto,
      id,
    );
  }

  async modifyFormation(
    formationId: number,
    modifyFormationDto: ModifyFormationDto,
  ) {
    return await this.formationRepository.modifyFormation(
      formationId,
      modifyFormationDto,
    );
  }

  async deleteFormation(formationId: number) {
    return await this.formationRepository.deleteFormation(formationId);
  }

  async getFormation(formationId: number){
    return await this.formationRepository.getFormation(formationId);
  }
}
