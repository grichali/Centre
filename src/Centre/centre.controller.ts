import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CentreService } from './centre.service';
import { CreatCentreDto } from './dto/create-centre.dto';

@Controller('centre')
export class CentreController {

    constructor(private readonly centreService: CentreService) {}



    @Post()
    signUp(    @Body(ValidationPipe) createCentretDto : CreatCentreDto
    ){
        return this.centreService.signUp(createCentretDto);
    }
}
