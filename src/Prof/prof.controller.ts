/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProfService } from './prof.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/Roles/roles.decorator';

@Controller('prof')
@UseGuards(JwtAuthGuard,RolesGuard)
export class ProfController {

    constructor(
        private readonly profService : ProfService,
    ){}
    @Roles('etudiant','admin','prof')
    @Get('getprof/:id')
    async getProf(
        @Param('/:id') profId : number
    ){
        return this.profService.getProf(profId);
    }

   /* @Get('protected-route')
    @UseGuards(JwtAuthGuard)
    getProtectedRoute(): string {
    return 'This is a protected route for Prof';
  }*/

}
