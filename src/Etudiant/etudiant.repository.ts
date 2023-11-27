// etudiant.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Etudiant } from './etudiant.entity';
import { CreatEtudiantDto } from './dto/create-etudiant.dto';

@EntityRepository(Etudiant)
export class EtudiantRepository extends Repository<Etudiant> {
  signUp(createEtudiantDto: CreatEtudiantDto) {
    const {nom, prenom, tel, niveau, email,password } = createEtudiantDto;
    const etudiant1 = new Etudiant();
    console.log(nom,prenom,tel,niveau,email)
    etudiant1.nom = nom ;
    etudiant1.prenom = prenom ;
    etudiant1.tel = tel;
    etudiant1.niveau = niveau ;
    etudiant1.email = email ;
    etudiant1.password = password ;
    return this.save(etudiant1);
  }


} 
