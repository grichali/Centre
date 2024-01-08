import { Module } from '@nestjs/common';
import { SeanceReservController } from './seance_reserv.controller';
import { SeanceReservService } from './seance_reserv.service';
import { typeOrmConfig } from 'src/config/typeormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeanceReserv } from './seance_reserv.entity';
import { SeanceResevRepository } from './seance_reserv.repository';
import { EtudiantRepository } from 'src/etudiant/etudiant.repository';
import { FormationRepository } from 'src/formation/formation.repository';
import { ProfRepository } from 'src/prof/prof.repository';
import { SeanceRepository } from 'src/seance/seance.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeanceReserv, ProfRepository, FormationRepository]),
  ],
  controllers: [SeanceReservController],
  providers: [
    SeanceReservService,
    SeanceResevRepository,
    EtudiantRepository,
    SeanceRepository,
    ProfRepository,
    FormationRepository,
    
  ],
})
export class SeanceReservModule {}

