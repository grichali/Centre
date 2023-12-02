import { EntityRepository, Repository } from "typeorm";
import { Prof } from "./prof.entity";
import { CreatProfDto } from "./dto/create-prof.dto";


@EntityRepository(Prof)
export class ProfRepository extends Repository<Prof>{
  async signUP(createProfDto: CreatProfDto) {
    const {nom, prenom, tel, description, email,password } = createProfDto;
    const prof1 = new Prof()
    console.log('Received values:', nom, prenom, tel, description, email);
    prof1.nom = nom;
    prof1.prenom = prenom;
    prof1.tel = tel;
    prof1.description = description;
    prof1.email = email;
    prof1.password = password;
    return await this.save(prof1);
  }

} 