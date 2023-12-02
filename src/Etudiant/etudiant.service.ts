import { Injectable } from '@nestjs/common';
import { CreatEtudiantDto } from './dto/create-etudiant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EtudiantRepository } from './etudiant.repository';

@Injectable() 
export class EtudiantService {


    constructor(
        @InjectRepository(EtudiantRepository)
        private etudiantRepository: EtudiantRepository,
      ) {}

    signUP(createEtudiantDto: CreatEtudiantDto) {
        return this.etudiantRepository.signUp(createEtudiantDto);
    }
}
  