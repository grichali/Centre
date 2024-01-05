import { BadRequestException, Injectable } from '@nestjs/common';
import { SeanceResevRepository } from './seance_reserv.repository';

@Injectable()
export class SeanceReservService {

    constructor(
        private readonly seanceResevRepository: SeanceResevRepository,
      ) {}
     
      async createReservation(etudiantId: number, seanceId: number) {
    
        try {
          return await this.seanceResevRepository.createReservation(etudiantId, seanceId);
        } catch (error) {
          console.error('Error creating reservation:', error);
          throw new BadRequestException('Failed to create reservation');
        }
      }

      async getEtudiantReservations(etudiantId : number ){
        return await this.seanceResevRepository.getEtudiantReservations(etudiantId);
      }

      async deleteReservation(resId:number){
        return await this.seanceResevRepository.deleteReservation(resId);
      }

}
