import { Injectable, Scope } from '@nestjs/common';
import { CreatEtudiantDto } from './dto/create-etudiant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EtudiantRepository } from './etudiant.repository';
import { LogInDTO } from 'src/auth/dto/login.dto';

@Injectable({ scope: Scope.REQUEST })
export class EtudiantService {


    constructor(
        private etudiantRepository: EtudiantRepository,
      ) {}

    async signUP(createEtudiantDto: CreatEtudiantDto) {
        return await this.etudiantRepository.signUp(createEtudiantDto);
    }

    async logIn(loginDto : LogInDTO){
        return await this.etudiantRepository.logIn(loginDto)
    }
}
   