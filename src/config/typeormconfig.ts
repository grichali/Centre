// typeorm.config.ts
import * as path from "path";

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Centre } from "src/Centre/centre.entity";
import { Etudiant } from "src/Etudiant/etudiant.entity";
import { Review } from "src/Review/review.entity";
import { Formation } from "src/Formation/formation.entity";
import { Prof } from "src/Prof/prof.entity";
import { EtudiantFormation } from "src/Etudiant/Reservation/reservation.entity";
import { Salle } from "src/Salle/salle.entity";
import { Seance } from "src/Seance/seance.entity";
import { User } from "src/User/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'salles',
//  entities: [__dirname + '/../**/*.entity.js'],
 entities: [Centre,Etudiant,Prof,User,EtudiantFormation,Formation,Review,Salle,Seance],
 synchronize: false,
  logging: true,
  autoLoadEntities:true,
};