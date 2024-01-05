import { Etudiant } from "src/Etudiant/etudiant.entity";
import { Prof } from "src/Prof/prof.entity";
import { Review } from "src/Review/review.entity";
import { Seance } from "src/Seance/seance.entity";
import { FormationReserv } from "src/formation_reserv/formation_reserv.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Formation {
    @PrimaryGeneratedColumn()
    id : number ;

    @Column()
    Type:string ;

    @Column() 
    prix : number;
 
    @Column()
    description : string;

    @OneToMany(() => Seance , seance =>seance.formation)
    seance : Seance[];

    
    @OneToMany(() => Review , review => review.formation)
    reviews : Review[];

    @ManyToOne(()=>Prof, prof => prof.formations)
    prof : Prof;

    @OneToMany(() => FormationReserv , reservations => reservations.formation)
    reservations: FormationReserv[];

}