import { Injectable, Scope } from '@nestjs/common';
import { CreatEtudiantDto } from './dto/create-etudiant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EtudiantRepository } from './etudiant.repository';

@Injectable({ scope: Scope.REQUEST })
export class EtudiantService {


    constructor(
        private etudiantRepository: EtudiantRepository,
      ) {}

    async signUP(createEtudiantDto: CreatEtudiantDto) {
        
        return await this.etudiantRepository.signUp(createEtudiantDto);
    }
}
   