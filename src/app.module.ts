import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfModule } from './prof/prof.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { SeanceModule } from './seance/seance.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { CentreModule } from './centre/centre.module';
import { SalleModule } from './salle/salle.module';
import { FormationModule } from './formation/formation.module';
import { AdminModule } from './admin/admin.module';
import { FormationReservModule } from './formation_reserv/formation_reserv.module';
import { SeanceReservModule } from './seance_reserv/seance_reserv.module';
import { ReviewSeanceModule } from './review_seance/review_seance.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        // other JWT options...
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ProfModule,
    EtudiantModule,
    SeanceModule,
    ReviewModule,
    AuthModule,
    CentreModule,
    SalleModule,
    FormationModule,
    AdminModule,
    FormationReservModule,
    SeanceReservModule,
    ReviewSeanceModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
