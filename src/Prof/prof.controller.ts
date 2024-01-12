/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProfService } from './prof.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('prof')
export class ProfController {

    constructor(
        private readonly profService : ProfService,
        private readonly authService: AuthService,
    ){}

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
