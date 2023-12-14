import { User } from 'src/User/user.entity';
import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@Entity()
export class Admin extends User {
  @Column()
  acces_level: number;

  @Column()
  role: string;

  @Column()
  permission: string;
}

