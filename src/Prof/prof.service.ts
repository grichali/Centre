import { Injectable } from '@nestjs/common';
import { CreatProfDto } from './dto/create-prof.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfRepository } from './prof.repository';
import { Prof } from './prof.entity';
import { LogInDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class ProfService {
  constructor(private readonly profRepository: ProfRepository) {}

  async signUp(createProfDto: CreatProfDto) {
    return await this.profRepository.signUP(createProfDto);
  }

  async logIn(logInDto: LogInDTO) {
    return await this.profRepository.logIn(logInDto);
  }

  async getProf(id: number) {
    return await this.profRepository.getProf(id);
  }

  async DeleteProf(Id: number) {
    return await this.profRepository.DeleteProf(Id);
  }
}
