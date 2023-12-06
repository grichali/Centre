import { Injectable } from '@nestjs/common';
import { CreatProfDto } from './dto/create-prof.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfRepository } from './prof.repository';
import { Prof } from './prof.entity';

@Injectable()
export class ProfService {

    constructor(
        private readonly profRepository: ProfRepository,
      ) {} 

    async signUp(createProfDto: CreatProfDto) {
        return await this.profRepository.signUP(createProfDto);
    }
}
  