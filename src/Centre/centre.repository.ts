/* eslint-disable prettier/prettier */
import { DataSource, EntityRepository, Repository, getRepository } from "typeorm";
import { Centre } from "./centre.entity";
import { CreatCentreDto } from "./dto/create-centre.dto";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LogInDTO } from "src/auth/dto/login.dto";
import * as bcrypt from 'bcrypt';
import { request } from "http";
import { error } from "console";
import { SalleRepository } from "src/salle/salle.repository";

@Injectable()
export class CentreRepository extends Repository<Centre>{

  constructor(private dataSource: DataSource,
    /*private readonly salleRepository? : SalleRepository*/) {
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
  async DeleteCentre(centreId: number): Promise<void> {
    const centre = await this.findOne( {      where: { id: centreId },
      relations: ['salles'], });

    if (!centre) {
      throw new NotFoundException('Centre not found!');
    }

    const salles = centre.salles;

    if (salles && salles.length > 0) {
      const salleRepository = this.dataSource.getRepository('Salle'); // Replace 'Salle' with your entity name
      await salleRepository.delete(salles.map(salle => salle.id)); // Delete associated Salles
    }

    // Now, delete the Centre
    try {

      await this.remove(centre);
    } catch (error) {
      console.error('Error deleting centre:', error);
      throw new BadRequestException('Failed to delete centre');
    }
  }
/*async DeleteCentre(centreId : number){
  const centre = await this.findOne({ where: { id: centreId },
    relations: ['salles'], });
  if (!centre) {
    throw new BadRequestException('Centre not found !');
  }
  if (centre.salles && centre.salles.length > 0) {
    await Promise.all(centre.salles.map(async (salles) => {
      await this.salleRepository.remove(salles); // Adjust this line according to your entity setup
    }));
  }
  try {

    await this.remove(centre);
  } catch (error) {
    console.error('Error deleting centre:', error);
    throw new BadRequestException('Failed to delete centre');
  }
}*/
}







