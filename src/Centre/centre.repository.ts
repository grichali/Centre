import { DataSource, EntityRepository, Repository } from "typeorm";
import { Centre } from "./centre.entity";
import { CreatCentreDto } from "./dto/create-centre.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class CentreRepository extends Repository<Centre>{
  
  constructor(private dataSource: DataSource) {
    super(Centre, dataSource.createEntityManager());
  }

  
  async signUP(createCentretDto: CreatCentreDto) {
    const { nom, prenom, tel, email, password, adresse, description } = createCentretDto;
  
    // Create a new instance of the Centre entity
    const newCentre = this.create({
      nom,
      prenom,
      tel,
      email,
      password, // Note: You might want to hash the password before saving it
      adresse,
      description,
    });
  
    // Save the new Centre to the database
    return await this.save(newCentre);

  }
  
} 