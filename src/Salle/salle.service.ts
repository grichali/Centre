/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { SalleRepository } from './salle.repository';
import { CreateSalleDto } from './dto/createsalle.dto';
import { ModifySalleDto } from './dto/modifysalle.dto';

@Injectable()
export class SalleService {
  constructor(private readonly salleRepository: SalleRepository) {}

  async createSalle(createSalleDto: CreateSalleDto, id) {
    return await this.salleRepository.createSalle(createSalleDto, id);
  }

  async modifySalle(salleId: number,  centreId: number,modifySalleDto: ModifySalleDto) {
    return await this.salleRepository.modifySalle(salleId,  centreId,modifySalleDto);
  }

  async deleteSalle(salleId: number, centreId: number) {
    return await this.salleRepository.deleteSalle(salleId,centreId);
  }

  async getCentreSalles(centreId : number ){
    return await this.salleRepository.getCentreSalles(centreId);
  }

  async getAvailableTimeSlots(salleId: number, date: string) {
    return this.salleRepository.getAvailableTimeSlots(salleId,date);
  }
}
