import { Body, Controller, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationServiceService: ReservationService) {}

  @Post('/create')
  async createReservation(
    @Body() body: { formationId: number; etudiantId: number },
  ) {
    const { formationId, etudiantId } = body;
    return await this.reservationServiceService.createReservation(
      etudiantId,
      formationId,
    );
  }
}
