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
    @Post('modify')
    async modifySalleDto(

      @Body(ValidationPipe) modifySalleDto: ModifySalleDto,
      @Req() req,
    ) {const salleId = req.user.payload.id
      return await this.salleService.modifySalle(salleId, modifySalleDto);
    }
    @Roles('centre','admin')
    @Delete('delete')
    async deleteSalle(
      @Param('id') salleId: number): Promise<void> {
      await this.salleService.deleteSalle(salleId);
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
