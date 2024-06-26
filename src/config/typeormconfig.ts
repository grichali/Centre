/* eslint-disable prettier/prettier */
// typeorm.config.ts
//import * as path from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Centre } from 'src/Centre/centre.entity';
import { Etudiant } from 'src/Etudiant/etudiant.entity';
import { Review } from 'src/Review/review.entity';
import { Formation } from 'src/Formation/formation.entity';
import { Prof } from 'src/Prof/prof.entity';
import { Salle } from 'src/Salle/salle.entity';
import { Seance } from 'src/Seance/seance.entity';
import { User } from 'src/User/user.entity';
import { CentreRepository } from 'src/centre/centre.repository';
import { Admin } from 'src/admin/entities/admin.entity';
import { FormationReserv } from 'src/formation_reserv/formation_reserv.entity';
import { SeanceReserv } from 'src/seance_reserv/seance_reserv.entity';
import { ReviewSeance } from 'src/Review_seance/review_seance.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'aa',
  //  entities: [__dirname + '/../**/*.entity.js'],
  entities: [
    Centre,
    Etudiant,
    Prof,
    User,
    Formation,
    Review,
    Salle,
    Seance,
    Admin,
    CentreRepository,
    FormationReserv,
    SeanceReserv,
    ReviewSeance,
   ],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
