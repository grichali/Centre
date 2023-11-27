import { Injectable } from '@nestjs/common';
import { CreatProfDto } from './dto/create-prof.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfRepository } from './prof.repository';

@Injectable()
export class ProfService {

    constructor(
        @InjectRepository(ProfRepository)
        private profRepository: ProfRepository,
      ) {}

    signUp(createProfDto: CreatProfDto) {
        return "samaykom"
    }
}
  