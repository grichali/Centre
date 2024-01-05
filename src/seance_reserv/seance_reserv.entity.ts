import { Etudiant } from 'src/Etudiant/etudiant.entity';
import { Seance } from 'src/Seance/seance.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity('reserved_seance') 
export class SeanceReserv {

  @PrimaryGeneratedColumn()
  id:number ;


  @ManyToOne(() => Etudiant, etudiant => etudiant.reservation_seance)
  etudiant: Etudiant;


  @ManyToOne(() => Seance, seance => seance.reservations)
  seance: Seance;

}