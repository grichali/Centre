import { Centre } from "src/Centre/centre.entity";
import { Seance } from "src/Seance/seance.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Salle {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    nombrePlace :number;

    @Column()
    prixHeure : number;


    @Column({ type: 'text', default: '[]' })
    tempDispo: string; 


    @ManyToOne(() => Centre, centre => centre.salles)
    centre: Centre;

    @OneToMany(() => Seance, seance => seance.salle)
    seances: Seance[];
}