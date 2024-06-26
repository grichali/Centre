import { Formation } from 'src/Formation/formation.entity';
import { Prof } from 'src/Prof/prof.entity';
import { ReviewSeance } from 'src/Review_seance/review_seance.entity';
import { Salle } from 'src/Salle/salle.entity';
import { SeanceReserv } from 'src/seance_reserv/seance_reserv.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Seance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  date: string;

  @Column() 
  duration: number;

  @Column()
  description: string;

  @Column()
  prixSeance: number;

  @Column()
  placeDisponible: number;

  @Column()
  time: string;

  @ManyToOne(() => Salle, (salle) => salle.seances)
  salle: Salle;

  @ManyToOne(() => Formation, formation => formation.seance)
  formation : Formation;

  @ManyToOne(() => Prof, (prof) => prof.seances)
  prof: Prof;

  @OneToMany(() => SeanceReserv , seanceReserv => seanceReserv.seance)
  reservations: SeanceReserv[];
  
  @OneToMany(() => ReviewSeance , reviewSeance => reviewSeance.seance)
  reviews: ReviewSeance[];

}
