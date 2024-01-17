/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,Req, UnauthorizedException,
} from '@nestjs/common';
import { SalleService } from './salle.service';
import { CreateSalleDto } from './dto/createsalle.dto';
import { ModifySalleDto } from './dto/modifysalle.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/Roles/roles.decorator';


@Controller('salle')
@UseGuards(JwtAuthGuard, RolesGuard)

export class SalleController {
  constructor(private readonly salleService: SalleService) {}
  @Roles('centre')
  @Post('create')
  async createSalle(
    @Body(ValidationPipe) createSalleDto: CreateSalleDto,
    @Req() req,
  ) {
    const centreId = req.user.payload.id;
    console.log("mama")

    if (req.user.roles.includes('centre')) {
      return await this.salleService.createSalle(createSalleDto, centreId);
    } else {
      throw new UnauthorizedException('You do not have the required role to create a salle');
    }
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
