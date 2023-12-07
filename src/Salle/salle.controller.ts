import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common';
import { SalleService } from './salle.service';
import { CreateSalleDto } from './dto/createsalle.dto';
import { ModifySalleDto } from './dto/modifysalle.dto';

@Controller('salle')
export class SalleController {

    constructor(
        private readonly salleService : SalleService
    ){}


    @Post('create/:id')
    async createSalle(
        @Body(ValidationPipe) createSalleDto : CreateSalleDto,
        @Param('id') centreid : number,
    ){
        return await this.salleService.createSalle(createSalleDto,centreid);
    }

    @Post('modify/:id')
    async modifySalleDto(
        @Param('id') salleId : number,
        @Body(ValidationPipe) modifySalleDto: ModifySalleDto
    ){
        return await this.salleService.modifySalle(salleId,modifySalleDto);
    }
}
 