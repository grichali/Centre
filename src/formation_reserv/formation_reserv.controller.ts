import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { FormationReservService } from './formation_reserv.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('formation-reserv') 
@UseGuards(JwtAuthGuard)
export class FormationReservController {


    constructor(private readonly formationReservService: FormationReservService) {}

    @Post('/create')
    async createReservation(
      @Body() body: { formationId: number; etudiantId: number },
    ) {
      const { formationId, etudiantId } = body;
      return await this.formationReservService.createReservation(
        etudiantId,
        formationId,
      );
    }
  
    @Post('getEtudiantReservations/:id')
    async getEtudiantReservations(
      @Param() id : number
    ){
      return await this.formationReservService.getEtudiantReservations(id);
    }
  
    @Delete('delete/:id')
    async deleteReservation(
      @Param('id') resId:number
      ){
      return this.formationReservService.deleteReservation(resId)
    }
}
