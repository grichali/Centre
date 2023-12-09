import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/createformation.dto';
import { ModifyFormationDto } from './dto/modifyformation.dto';

@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post('create/:id')
  async createFormation(
    @Body(ValidationPipe) createFormationDto: CreateFormationDto,
    @Param('id') profid: number,
  ) {
    return await this.formationService.createFormation(
      createFormationDto,
      profid,
    );
  }

  @Post('modify/:id')
  async modifyFormationDto(
    @Param('id') formationId: number,
    @Body(ValidationPipe) modifyFormationDto: ModifyFormationDto,
  ) {
    return await this.formationService.modifyFormation(
      formationId,
      modifyFormationDto,
    );
  }

  @Delete('delete/:id')
  async deleteFormation(@Param('id') formationId: number): Promise<void> {
    await this.formationService.deleteFormation(formationId);
  }
}
