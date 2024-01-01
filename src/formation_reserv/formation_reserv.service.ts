import { BadRequestException, Injectable } from '@nestjs/common';
import { FormationReserv } from './formation_reserv.entity';

@Injectable()
export class FormationReservService {

    constructor(
        private readonly formationReservService: FormationReservService,
      ) {}
    
      async createReservation(etudiantId: number, formationId: number) {
    
        try {
          return await this.formationReservService.createReservation(etudiantId, formationId);
        } catch (error) {
          console.error('Error creating reservation:', error);
          throw new BadRequestException('Failed to create reservation');
        }
      }

      async getEtudiantReservations(etudiantId : number ){
        return await this.formationReservService.getEtudiantReservations(etudiantId);
      }

      async deleteReservation(resId:number){
        return await this.formationReservService.deleteReservation(resId);
      }
} 
