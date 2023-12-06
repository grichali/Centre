import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Etudiant } from './etudiant.entity';
import { CreatEtudiantDto } from './dto/create-etudiant.dto';
import { Injectable } from '@nestjs/common';

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
    etudiant.password = password;
    return await this.save(etudiant);
  } 
}
