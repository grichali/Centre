import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SeanceReservService } from './seance_reserv.service';

@Controller('seance-reserv')
export class SeanceReservController {

    constructor(private readonly seanceReservService: SeanceReservService) {}

    @Post('/create')
    async createReservation(
      @Body() body: { seanceId: number; etudiantId: number },
    ) {
      const { seanceId, etudiantId } = body;
      return await this.seanceReservService.createReservation(
        etudiantId,
        seanceId,
      );
    }
  
    @Post('getEtudiantReservations/:id')
    async getEtudiantReservations(
      @Param() id : number
    ){
      return await this.seanceReservService.getEtudiantReservations(id);
    }
  
    @Delete('delete/:id')
    async deleteReservation(
      @Param('id') resId:number
      ){
      return this.seanceReservService.deleteReservation(resId)
    }

}
