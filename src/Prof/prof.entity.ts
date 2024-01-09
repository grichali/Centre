import { Formation } from 'src/Formation/formation.entity';
import { Seance } from 'src/Seance/seance.entity';
import { User } from 'src/User/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Prof extends User {
  [x: string]: any;
  @Column()
  description: string;

  @OneToMany(() => Formation, (formation) => formation.prof)
  formations: Formation[];

  @OneToMany(() => Seance, (seance) => seance.prof)
  seances: Seance[];

}
 