/* eslint-disable prettier/prettier */
  import { Controller, Delete,Get,Param,UseGuards} from '@nestjs/common';
  import { CentreService } from './centre.service';
  import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/Roles/roles.decorator';


  @Controller('centre')
  @UseGuards(JwtAuthGuard,RolesGuard)

  export class CentreController {
    constructor(private readonly centreService: CentreService) {}
    @Roles('centre','admin','prof')
    @Get('getsalles/:id')
    async getSalles(@Param('id') centreId: number,
    ) {
      return this.centreService.getSalles(centreId);
    }
    @Roles('centre','admin','prof')
    @Get('getcentre/:id')
    async getCentre(@Param(':id') centreId: number) {
      return this.centreService.getCentre(centreId);
    }
    @Roles('centre')
    @Delete('delete/:id')
    async DeleteCentre(@Param('id') centreId: number): Promise<void> {
      return this.centreService.DeleteCentre(centreId);
    }
  }
