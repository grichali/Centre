/* eslint-disable prettier/prettier */
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { Formation } from 'src/Formation/formation.entity';
import { Etudiant } from 'src/Etudiant/etudiant.entity';

@Entity('reserved_formation')
export class FormationReserv {

  @PrimaryGeneratedColumn()
  id:number ;


  @ManyToOne(() => Etudiant, etudiant => etudiant.reservations)
  etudiant: Etudiant;


  @ManyToOne(() => Formation, formation => formation.reservations)
  formation: Formation;

}
