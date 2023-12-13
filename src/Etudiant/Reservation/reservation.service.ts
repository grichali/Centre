import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';

@Injectable({ scope: Scope.REQUEST })
export class ReservationService {


    constructor(
        private readonly reservationRepository: ReservationRepository,
      ) {}
    
      async createReservation(etudiantId: number, formationId: number) {


    
        try {
          return await this.reservationRepository.createReservation(etudiantId, formationId);
        } catch (error) {
          console.error('Error creating reservation:', error);
          throw new BadRequestException('Failed to create reservation');
        }
      }
} 
   