
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  tel: string;

  @Column()
  email: string ;

  @Column()
  password: string;

  @Column()
  salt : string;

  async validatePassword(password : string) : Promise<boolean>{
    const hash = await bcrypt.hash(password , this.salt);
    return hash === this.password
  }
  
}
