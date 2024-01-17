import { Module } from '@nestjs/common';
import { FormationReservService } from './formation_reserv.service';
import { FormationReservController } from './formation_reserv.controller';
import { FormationReservRepository } from './formation_reserv.repository';
import { EtudiantRepository } from 'src/etudiant/etudiant.repository';
import { FormationRepository } from 'src/formation/formation.repository';
import { FormationReserv } from './formation_reserv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfRepository } from 'src/prof/prof.repository';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
 
@Module({
  imports:[TypeOrmModule.forFeature([FormationReserv]),ConfigModule.forRoot()],
  providers: [FormationReservService,
    FormationReservRepository,
    EtudiantRepository,
    FormationRepository,
    ProfRepository,
  ],
  controllers: [FormationReservController]
})
export class FormationReservModule {}
