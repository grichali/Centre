import { Salle } from "src/Salle/salle.entity";
import { User } from "src/User/user.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity()
export class Centre extends User{

    @Column()
    adresse : string ;

    @Column()
    description : string;

    @OneToMany(() => Salle, salle => salle.centre)
    salles: Salle[];
}
