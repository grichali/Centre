import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CentreRepository } from './centre.repository';
import { Centre } from './centre.entity';
import { CreatCentreDto } from './dto/create-centre.dto';
import { LogInDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class CentreService {


    constructor(
        private readonly centreRepository: CentreRepository,
      ) {}


    async signUp(createCentretDto : CreatCentreDto){
        
      return await this.centreRepository.signUP(createCentretDto);
    }

    async logIn(loginDto : LogInDTO){
      return await this.centreRepository.logIn(loginDto)
  }
  
}
