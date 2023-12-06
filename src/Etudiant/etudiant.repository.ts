import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Etudiant } from './etudiant.entity';
import { CreatEtudiantDto } from './dto/create-etudiant.dto';
import { Injectable } from '@nestjs/common';
import { LogInDTO } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EtudiantRepository extends Repository<Etudiant> {


  constructor(private dataSource: DataSource) {
    super(Etudiant, dataSource.createEntityManager());
  }
  
  async signUp(createEtudiantDto: CreatEtudiantDto) {
    const { nom, prenom, tel, niveau, email, password } = createEtudiantDto;
    const etudiant = new Etudiant();
    etudiant.nom = nom;
    etudiant.prenom = prenom;
    etudiant.tel = tel;
    etudiant.niveau = niveau;
    etudiant.email = email;
    etudiant.salt = await bcrypt.genSalt() ;
    etudiant.password = await bcrypt.hash(password,etudiant.salt);
    return await this.save(etudiant);
  } 

  async logIn(loginDto : LogInDTO){
    const {email , password} = loginDto;
    try{
      const etudiant = await this.findOne({
        where : {email}
      })
      if(etudiant && etudiant.validatePassword(password)){
        return "Hey " + etudiant.nom;
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
