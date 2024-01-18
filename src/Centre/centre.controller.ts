/* eslint-disable prettier/prettier */
  import { Controller, Delete,Get,Param,UseGuards, Req} from '@nestjs/common';
  import { CentreService } from './centre.service';
  import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/Roles/roles.decorator';

//test hh
  @Controller('centre')
  @UseGuards(JwtAuthGuard,RolesGuard)

  export class CentreController {
    constructor(private readonly centreService: CentreService) {}
    @Roles('centre','admin')
    @Get('getsalles')
    async getSalles(@Req() req ,
    ) { const centreId = req.user.payload.id
      return this.centreService.getSalles(centreId);
    }
    @Roles('centre','admin','prof')
    @Get('getcentre/:id')
    async getCentre(@Param(':id') centreId: number) {
      return this.centreService.getCentre(centreId);
    }
    @Roles('centre')
    @Delete('delete')
    async DeleteCentre(@Req() req ,): Promise<void> {
      const  centreId = req.user.payload.id
      return this.centreService.DeleteCentre(centreId);
    }
  }
