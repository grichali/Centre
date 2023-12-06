import { DataSource, EntityRepository, Repository } from "typeorm";
import { Centre } from "./centre.entity";
import { CreatCentreDto } from "./dto/create-centre.dto";
import { Injectable } from "@nestjs/common";
import { LogInDTO } from "src/auth/dto/login.dto";


@Injectable()
export class CentreRepository extends Repository<Centre>{
  
  constructor(private dataSource: DataSource) {
    super(Centre, dataSource.createEntityManager());
  }

  
  async signUP(createCentretDto: CreatCentreDto) {
    const { nom, prenom, tel, email, password, adresse, description } = createCentretDto;
      const newCentre = this.create({
      nom,
      prenom,
      tel,
      email,
      password, 
      description,
    });
    return await this.save(newCentre);

  }

  async logIn(loginDto : LogInDTO){
    const {email , password} = loginDto;
    try{
      const centre = await this.findOne({
        where : {email}
      })
      if(centre && password === centre.password){
        return "Hey " + centre.nom;
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
  
} 