import { Etudiant } from 'src/Etudiant/etudiant.entity';
import { Formation } from 'src/Formation/formation.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
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

  @ManyToOne(() => Formation, (formation) => formation.reviews)
  formation: Formation;

  @ManyToOne(() => Etudiant, (etudiant) => etudiant.reviews)
  etudiant: Etudiant;
}
