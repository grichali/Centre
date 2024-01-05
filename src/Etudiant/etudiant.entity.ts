// Etudiant entity
import { Entity, Column, OneToMany } from 'typeorm';
import { Review } from 'src/Review/review.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/User/user.entity';
import { FormationReserv } from 'src/formation_reserv/formation_reserv.entity';
import { SeanceReserv } from 'src/seance_reserv/seance_reserv.entity';
import { ReviewSeance } from 'src/Review_seance/review_seance.entity';

@Entity()
export class Etudiant extends User{
 
  @Column()
  niveau: string;
 
  @OneToMany(() => Review, review => review.etudiant)
  reviews: Review[];

  @OneToMany(() => ReviewSeance , reviewSeance => reviewSeance.etudiant)
  review_seance: ReviewSeance[];

  
  @OneToMany(() => FormationReserv , reservations => reservations.etudiant)
  reservations: FormationReserv[];


  @OneToMany(() => SeanceReserv , seanceReserv => seanceReserv.etudiant)
  reservation_seance: SeanceReserv[];
}
  