/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Param,
  Post,
  ValidationPipe,
  Delete,
  UseGuards,Req,
} from '@nestjs/common';
import { SeanceService } from './seance.service';
import { CreateSeanceDto } from './dto/createseance.dto';
import { ModifySeanceDto } from './dto/modifyseance.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/Roles/roles.decorator';

@Controller('seance')
@UseGuards(JwtAuthGuard,RolesGuard)

export class SeanceController {
  constructor(private readonly seanceService: SeanceService) {}
  @Roles('prof')
  @Post('create/:id_salle')
  async createSeance(
    @Body(ValidationPipe) createSeanceDto: CreateSeanceDto,
    @Req() req ,
    @Param('id_salle') salleId: number,
  ) { const profId = req.user.payload.id
    return await this.seanceService.createSeance(
      createSeanceDto,
      profId,
      salleId,
    );
  }

  @Post('modify/:id')
  async modifySeanceDto(
    @Param('id') seanceId: number,
    @Body(ValidationPipe) modifySeanceDto: ModifySeanceDto,
  ) {
    return await this.seanceService.modifySeance(seanceId, modifySeanceDto);
  }

  @Delete('delete/:id')
  async deleteFormation(@Param('id') seanceId: number): Promise<void> {
    await this.seanceService.deleteSeance(seanceId);
  }
  @Post('integre/:id/:id_formation')
  async integreFormation(
    @Param('id') seanceId: number,
    @Param('id_formation') formationId: number,
  ) {
    return await this.seanceService.integreFormation(seanceId, formationId);
  }
}
