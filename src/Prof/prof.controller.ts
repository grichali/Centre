import { Controller, Get, Param } from '@nestjs/common';
import { ProfService } from './prof.service';

@Controller('prof')
export class ProfController {

    constructor(
        private readonly profService : ProfService
    ){}

    @Get('getprof/:id')
    async getProf(
        @Param('/:id') profId : number
    ){
        return this.profService.getProf(profId);
    }

}
