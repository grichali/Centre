import { DataSource, EntityRepository, Repository } from "typeorm";
import { Centre } from "./centre.entity";
import { CreatCentreDto } from "./dto/create-centre.dto";
import { Injectable } from "@nestjs/common";
import { LogInDTO } from "src/auth/dto/login.dto";
import * as bcrypt from 'bcrypt';
import { request } from "http";

@Injectable()
export class CentreRepository extends Repository<Centre>{
  
  constructor(private dataSource: DataSource) {
    super(Centre, dataSource.createEntityManager());
  }
  
  async signUP(createCentretDto: CreatCentreDto) {
    const { nom, prenom, tel, email, password, adresse, description } = createCentretDto;
    const centre = new Centre();
    centre.nom = nom;
    centre.prenom = prenom;
    centre.tel = tel;
    centre.email = email;
    centre.adresse = adresse;
    centre.description = description;
    centre.salles = []
    centre.salt = await bcrypt.genSalt() ;
    centre.password = await bcrypt.hash(password,centre.salt);
    return await this.save(centre);
  }

  async logIn(loginDto : LogInDTO){
    const {email , password} = loginDto;
    try{
      const centre = await this.findOne({
        where : {email}
      })
      if(centre && centre.validatePassword(password)){ 
        return centre;
      }
      else {
        return "password or email are incorrect";
      }
    }
    catch(error){
      console.error("Error during login:", error.message);
      throw new Error("Login failed");
    }
  }


  async getSalles(centreId: number): Promise<Centre | undefined> {
    return this.findOne({
      where: { id: centreId },
      relations: ['salles'],
    });
  }


  


} 