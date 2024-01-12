/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Prof } from './prof.entity';
import { CreatProfDto } from './dto/create-prof.dto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInDTO } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfRepository extends Repository<Prof> {


  constructor(private dataSource: DataSource) {
    super(Prof, dataSource.createEntityManager());
  }


  async getProf(profId : number){
    try{
      return await this.findOne({
        where : {id : profId},
        relations: ['formations', 'formations.reviews'],
        select:{
          id : true ,
          "nom": true,
          "prenom": true,
          "description": true,
          formations:{
            "id": true,
            "Type": true,
            "prix": true,
            "description": true,
            reviews : {
              profReview : true,
              profRating : true
            }
          }
        }
      })
    }catch(error){
      throw new Error('an error occured while getting prof information');
    }
  }

  async signUP(createProfDto: CreatProfDto) {
    const { nom, prenom, tel, description, email, password } = createProfDto;
    const prof1 = new Prof();
    console.log('Received values:', nom, prenom, tel, description, email);
    prof1.nom = nom;
    prof1.prenom = prenom;
    prof1.tel = tel;
    prof1.description = description;
    prof1.email = email;
    prof1.salt = await bcrypt.genSalt();
    prof1.password = await bcrypt.hash(password, prof1.salt);
    return await this.save(prof1);
  }

  async logIn(logInDto: LogInDTO) {
    const { email, password } = logInDto;
    try {
      const prof = await this.findOne({
        where: { email },
      });

      if (!prof) {
        throw new UnauthorizedException('User with this email does not exist');
      }

      const isPasswordValid = await prof.validatePassword(password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      return prof;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message); // Propagate the specific error message
      }

      console.error('Error during login:', error.message);
      throw new Error('Login failed');
    }
  }

  async DeleteProf(profId: number) {
    const prof = await this.findOne({
      where: { id: profId },
      relations: ['formations', 'seances'],
    });

    if (!prof) {
      throw new BadRequestException(`Prof with ID ${profId} does not exist.`);
    }

    try {
      await this.remove(prof);
      return { message: `Prof with ID ${profId} and associated formations and seances have been deleted successfully.` };
    } catch (error) {
      console.error('Error during deletion:', error.message);
      throw new Error('Failed to delete Prof.');
    }
  }


}
