import { DataSource, EntityRepository, Repository } from "typeorm";
import { Prof } from "./prof.entity";
import { CreatProfDto } from "./dto/create-prof.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ProfRepository extends Repository<Prof>{
  
  constructor(private dataSource : DataSource){
    super(Prof, dataSource.createEntityManager())
  }
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
    debugger;
    return await this.save(prof1);
  }

} 