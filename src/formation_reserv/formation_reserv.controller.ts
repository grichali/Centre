/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Post, UseGuards, Req } from '@nestjs/common';
import { FormationReservService } from './formation_reserv.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { Roles } from 'src/Roles/roles.decorator';
import { RolesGuard } from 'src/jwt/roles.guard';

@Controller('formation-reserv')
@UseGuards(JwtAuthGuard,RolesGuard)

export class FormationReservController {


    constructor(private readonly formationReservService: FormationReservService) {}
    @Roles('etudiant')
    @Post('/create')
    async createReservation(
      @Req() req,
      @Body() body: { formationId: number },
    ) {
      const etudiantId = req.user.payload.id;
      const { formationId  } = body;
      return await this.formationReservService.createReservation(
        etudiantId,
        formationId,
      );
    }
    @Roles('etudiant')
    @Post('getEtudiantReservations')
    async getEtudiantReservations(
      @Req() req,
    ){
      const id = req.user.payload.id
      return await this.formationReservService.getEtudiantReservations(id);
    }
    @Roles('etudiant')
    @Delete('delete/:id')
    async deleteReservation(
      @Param('id') resId:number,
      @Req() req,
      ){
        const etudiantId = req.user.payload.id
      return this.formationReservService.deleteReservation(etudiantId,resId)
    }
}
