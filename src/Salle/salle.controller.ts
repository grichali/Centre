import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SalleService } from './salle.service';
import { CreateSalleDto } from './dto/createsalle.dto';
import { ModifySalleDto } from './dto/modifysalle.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('salle')
@UseGuards(JwtAuthGuard)
export class SalleController {
  constructor(private readonly salleService: SalleService) {}

  @Post('create/:id')
  async createSalle(
    @Body(ValidationPipe) createSalleDto: CreateSalleDto,
    @Param('id') centreid: number,
  ) {
    return await this.salleService.createSalle(createSalleDto, centreid);
  }

  @Post('modify/:id')
  async modifySalleDto(
    @Param('id') salleId: number,
    @Body(ValidationPipe) modifySalleDto: ModifySalleDto,
  ) {
    return await this.salleService.modifySalle(salleId, modifySalleDto);
  }

  @Delete('/delete/:id')
  async deleteSalle(@Param('id') salleId: number): Promise<void> {
    await this.salleService.deleteSalle(salleId);
  }

  @Get('getall/:id')
  async getCentreSalles(
    @Param('/id')centreId : number ){
      return await this.salleService.getCentreSalles(centreId);
  }

  @Get('getavailable')
  async getAvailableTimeSlots(
    @Body('salleId') salleId: number,
    @Body('date') date: string){
    return this.salleService.getAvailableTimeSlots(salleId,date)
  }

}
