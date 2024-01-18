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

  //test     hhhhhhh

  @Controller('salle')
  @UseGuards(JwtAuthGuard, RolesGuard)

  export class SalleController {
    constructor(private readonly salleService: SalleService) {}
    @Roles('centre','admin')
    @Post('create')
    async createSalle(
      @Body(ValidationPipe) createSalleDto: CreateSalleDto,
      @Req() req,
    ) {
      const centreId = req.user.payload.id;

      if (req.user.payload.role.includes('centre','admin')) {
        return await this.salleService.createSalle(createSalleDto, centreId);
      } else {
        throw new UnauthorizedException('You do not have the required role to create a salle');
      }
    }
    @Roles('centre','admin')
    @Post('modify/:id')
    async modifySalleDto(

      @Body(ValidationPipe) modifySalleDto: ModifySalleDto,
      @Req() req,
      @Param('/id')salleId : number
    ) {const centreId = req.user.payload.id
      console.log("yarbi")
      return await this.salleService.modifySalle(salleId,centreId, modifySalleDto);
    }
    @Roles('centre','admin')
    @Delete('delete/:id')
    async deleteSalle(
      @Param('id') salleId: number, @Req() req,): Promise<void> {
        const centreId = req.user.payload.id
      await this.salleService.deleteSalle(salleId,centreId);
    }
    @Roles('centre','admin','prof')
    @Get('getall/:id')
    async getCentreSalles(
      @Param('/id')centreId : number ){
        return await this.salleService.getCentreSalles(centreId);
    }
    @Roles('prof','admin')
    @Get('getavailable')
    async getAvailableTimeSlots(
      @Body('salleId') salleId: number,
      @Body('date') date: string){
      return this.salleService.getAvailableTimeSlots(salleId,date)
    }

  }
