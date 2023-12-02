import { Injectable } from '@nestjs/common';
import { CreatProfDto } from './dto/create-prof.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfRepository } from './prof.repository';
import { Prof } from './prof.entity';

@Injectable()
export class ProfService {

    constructor(
        @InjectRepository(ProfRepository)
        private readonly profRepository: ProfRepository,
      ) {} 

    async signUp(createProfDto: CreatProfDto) {
        const {nom, prenom, tel, description, email,password } = createProfDto;
        const prof1 = new Prof()
        console.log('Received values:', nom, prenom, tel, description, email);
        prof1.nom = nom;
        prof1.prenom = prenom;
        prof1.tel = tel;
        prof1.description = description;
        prof1.email = email;
        prof1.password = password;
        return await this.profRepository.save(prof1);
    }
}
  