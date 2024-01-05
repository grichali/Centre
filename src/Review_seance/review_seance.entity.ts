import { Etudiant } from 'src/Etudiant/etudiant.entity';
import { Formation } from 'src/Formation/formation.entity';
import { Seance } from 'src/Seance/seance.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('seance_reviews')
export class ReviewSeance { 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profRating: number;

  @Column()
  centreRating: number;

  @Column()
  profReview: string;

  @Column()
  centreReview: string;

  @ManyToOne(() => Seance, (seance) => seance.reviews)
  seance: Seance;

  @ManyToOne(() => Etudiant, (etudiant) => etudiant.review_seance)
  etudiant: Etudiant;
}
