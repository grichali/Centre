/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { FormationReservRepository } from './formation_reserv.repository';

@Injectable()
export class FormationReservService {

    constructor(
        private readonly formationReservRepository: FormationReservRepository,
      ) {}

      async createReservation(etudiantId: number, formationId: number) {

        try {
          return await this.formationReservRepository.createReservation(etudiantId, formationId);
        } catch (error) {
          console.error('Error creating reservation:', error);
          throw new BadRequestException('Failed to create reservation');
        }
      }

      async getEtudiantReservations(etudiantId : number ){
        return await this.formationReservRepository.getEtudiantReservations(etudiantId);
      }

      async deleteReservation(etudiantId: number, resId: number){
        return await this.formationReservRepository.deleteReservation(etudiantId,resId);
      }
}
