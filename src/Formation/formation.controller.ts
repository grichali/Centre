/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,Req
} from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/createformation.dto';
import { ModifyFormationDto } from './dto/modifyformation.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/Roles/roles.decorator';


@Controller('formation')
@UseGuards(JwtAuthGuard, RolesGuard)

export class FormationController {
  constructor(private readonly formationService: FormationService) {}
  @Roles('prof')
  @Post('create')
  async createFormation(
    @Body(ValidationPipe) createFormationDto: CreateFormationDto,
    @Req() req,
  ) {
    const profid=req.user.payload.id
    return await this.formationService.createFormation(
      createFormationDto,
      profid,
    );
  }
  @Roles('prof','admin')
  @Post('modify/:id')
  async modifyFormationDto(
    @Param('id') formationId: number,
    @Body(ValidationPipe) modifyFormationDto: ModifyFormationDto,
    @Req() req,
  ) { const profId = req.user.payload.id
    return await this.formationService.modifyFormation(
      formationId,
      profId,
      modifyFormationDto,
    );
  }
  @Roles('prof','admin')
  @Delete('delete/:id')
  async deleteFormation(@Param('id') formationId: number,@Req() req,): Promise<void> {
    const profId = req.user.payload.id
    await this.formationService.deleteFormation(formationId,profId);
  }
  @Roles('prof','admin','etudiant')
  @Get('get/:id')
  async getFormation(
    @Param('id') formationId: number,
  ){
    return await this.formationService.getFormation(formationId);
  }

  @Roles('prof','admin','etudiant')
  @Get('getall')
  async getAll(){
    return await this.formationService.getAll();
  }
  @Roles('prof','admin','etudiant')
  @Get('getavailable')
  async getavAilableFormation(){
    return await this.formationService.getAvailableFormation();
  }
}
