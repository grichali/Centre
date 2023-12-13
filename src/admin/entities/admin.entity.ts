import { User } from 'src/User/user.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Admin extends User {
  @Column()
  acces_level: number;

  @Column()
  role: string;

  @Column()
  permission: string;
}
