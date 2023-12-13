import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { Etudiant } from '../etudiant.entity';
import { Formation } from 'src/Formation/formation.entity';

@Entity({ name: 'reservation' })
export class EtudiantFormation {

  @PrimaryGeneratedColumn()
  id:number ;

  
  @ManyToOne(() => Etudiant, etudiant => etudiant.id)
  @JoinColumn({ name: 'etudiantId' })
  etudiant: Etudiant;

  @ManyToOne(() => Formation, formation => formation.id)
  @JoinColumn({ name: 'formationId' })
  formation: Formation;

}
