import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CentreService } from './centre.service';
import { CreatCentreDto } from './dto/create-centre.dto';

@Controller('centre') 
export class CentreController {
  constructor(private readonly centreService: CentreService) {}

  @Get('getsalles/:id')
  async getSalles(@Param('id') centreId: number) {
    return this.centreService.getSalles(centreId);
  }
}
