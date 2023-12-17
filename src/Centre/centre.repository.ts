import { DataSource, EntityRepository, Repository } from "typeorm";
import { Centre } from "./centre.entity";
import { CreatCentreDto } from "./dto/create-centre.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LogInDTO } from "src/auth/dto/login.dto";
import * as bcrypt from 'bcrypt';
import { request } from "http";
import { error } from "console";

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

  async logIn(loginDto: LogInDTO) {
    const { email, password } = loginDto;
    try {
      const centre = await this.findOne({
        where: { email },
      });
  
      if (!centre) {
        throw new UnauthorizedException('Centre with this email does not exist');
      }
  
      const isPasswordValid = await centre.validatePassword(password);
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
  
      return centre;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message); // Propagate the specific error message
      }
  
      console.error('Error during login:', error.message);
      throw new Error('Login failed');
    }
  }

  async getSalles(centreId: number): Promise<Centre | undefined> {
    return this.findOne({
      where: { id: centreId },
      relations: ['salles'],
    });
  }

  async getCentre(centreId : number ){
    try{
      return await this.find({
        where : { id : centreId},
        relations : ['salles',
        'salles.seances',
        'salles.seances.formation',
      'salles.seances.formation.reviews'],
        select:{
        "id": true,
        "nom": true,
        "prenom": true,
        "adresse": true,
        "description": true,
        salles:{
          "id": true,
          "nombrePlace": true,
          "prixHeure": true,
          "description": true,
          seances:{
            id : true,
            formation:{
              "id": true,
              "Type": true,
              "prix": true,
              "description": true,
              reviews:{
                centreRating : true, 
                centreReview : true
              }
            }
          }
        }
        }
      })
    }catch(error){
      throw new Error('an error occured while getting centre information');

    }
  }


  


} 