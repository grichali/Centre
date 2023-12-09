import {
  Body,
  Controller,
  Param,
  Post,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { SeanceService } from './seance.service';
import { CreateSeanceDto } from './dto/createseance.dto';
import { ModifySeanceDto } from './dto/modifyseance.dto';

@Controller('seance')
export class SeanceController {
  constructor(private readonly seanceService: SeanceService) {}

  @Post('create/:id/:id_salle')
  async createSeance(
    @Body(ValidationPipe) createSeanceDto: CreateSeanceDto,
    @Param('id') profId: number,
    @Param('id_salle') salleId: number,
  ) {
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
