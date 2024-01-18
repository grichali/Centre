/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Post, UseGuards,Req } from '@nestjs/common';
import { SeanceReservService } from './seance_reserv.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/Roles/roles.decorator';

@Controller('seance-reserv')
@UseGuards(JwtAuthGuard,RolesGuard)
export class SeanceReservController {

    constructor(private readonly seanceReservService: SeanceReservService) {}
    @Roles('etudiant')
    @Post('/create')
    async createReservation(
      @Body() body: { seanceId: number; },
      @Req() req,
    ) {const etudiantId = req.user.payload.id
      const { seanceId } = body;
      return await this.seanceReservService.createReservation(
        etudiantId,
        seanceId,
      );
    }
    @Roles('etudiant')
    @Post('getEtudiantReservations')
    async getEtudiantReservations(
      @Req() req,
    ){
      const id = req.user.payload.id
      return await this.seanceReservService.getEtudiantReservations(id);
    }
    @Roles('etudiant')
    @Delete('delete/:id')
    async deleteReservation(
      @Param('id') resId:number,
      @Req() req,
      ){ const etudiantId = req.user.payload.id
      return this.seanceReservService.deleteReservation(resId,etudiantId)
    }

}
