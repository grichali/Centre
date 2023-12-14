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

  async modifySalle(salleId: number, modifySalleDto: ModifySalleDto) {
    return await this.salleRepository.modifySalle(salleId, modifySalleDto);
  }

  async deleteSalle(salleId: number) {
    return await this.salleRepository.deleteSalle(salleId);
  }

  async getCentreSalles(centreId : number ){
    return await this.salleRepository.getCentreSalles(centreId);
  }
}
