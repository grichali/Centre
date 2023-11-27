import { Injectable } from '@nestjs/common';
import { CreatEtudiantDto } from 'src/etudiant/dto/create-etudiant.dto';
import { EtudiantService } from 'src/etudiant/etudiant.service';
import { CreatProfDto } from 'src/prof/dto/create-prof.dto';
import { ProfService } from 'src/prof/prof.service';

@Injectable()
export class AuthService { 

    constructor(
        private readonly profService : ProfService,
        private readonly etudiantService : EtudiantService
    ){}

    signUpProf(createProfDto : CreatProfDto){
        return this.profService.signUp(createProfDto)
    }

    signUpEtudiant(createEtudiantDto : CreatEtudiantDto){
        return this.etudiantService.signUP(createEtudiantDto);
    }


    // loginProf(email, password){
    //     return this.profService.login(email,password);
    // }

    // loginEtudiant(email,password){
    //     return this.etudiantService.login(email,password);
    // }
} 
