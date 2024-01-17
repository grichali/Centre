import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { SeanceReservService } from './seance_reserv.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('seance-reserv')
@UseGuards(JwtAuthGuard)
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
