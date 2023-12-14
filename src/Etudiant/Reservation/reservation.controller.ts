import { Body, Controller,Delete, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('/create')
  async createReservation(
    @Body() body: { formationId: number; etudiantId: number },
  ) {
    const { formationId, etudiantId } = body;
    return await this.reservationService.createReservation(
      etudiantId,
      formationId,
    );
  }

  @Post('getEtudiantReservations/:id')
  async getEtudiantReservations(
    @Param() id : number
  ){
    return await this.reservationService.getEtudiantReservations(id);
  }

  @Delete('delete/:id')
  async deleteReservation(
    @Param('id') resId:number
    ){
    return this.reservationService.deleteReservation(resId)
  }
}
