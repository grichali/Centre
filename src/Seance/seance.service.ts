/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeanceRepository } from './seance.repository';
import { CreateSeanceDto } from './dto/createseance.dto';
import { ModifySeanceDto } from './dto/modifyseance.dto';

@Injectable()
export class SeanceService {
  constructor(private readonly seanceRepository: SeanceRepository) {}

  async createSeance(createSeanceDto: CreateSeanceDto, id, id_salle) {
    return await this.seanceRepository.createSeance(
      createSeanceDto,
      id,
      id_salle,
    );
  }
  async modifySeance(seanceId: number, modifySeancenDto: ModifySeanceDto, profId: number,) {
    return await this.seanceRepository.modifySeance(seanceId, modifySeancenDto,profId);
  }

  async deleteSeance(seanceId: number, profId: number) {
    return await this.seanceRepository.deleteSeance(seanceId,profId);
  }

  async integreFormation(seanceId: number, formationId: number,profId: number) {
    return await this.seanceRepository.integreFormation(seanceId, formationId,profId);
  }
}
