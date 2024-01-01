// Etudiant entity
import { Entity, Column, OneToMany } from 'typeorm';
import { Review } from 'src/Review/review.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/User/user.entity';
import { FormationReserv } from 'src/formation_reserv/formation_reserv.entity';

@Entity()
export class Etudiant extends User{
 
  @Column()
  niveau: string;
 
  @OneToMany(() => Review, review => review.etudiant)
  reviews: Review[];

  @OneToMany(() => FormationReserv , reservations => reservations.etudiant)
  reservations: FormationReserv[];

}
  