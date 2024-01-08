import { Module } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { SeanceController } from './seance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeanceRepository } from './seance.repository';
import { Seance } from './seance.entity';

import { ProfRepository } from 'src/Prof/prof.repository';
import { SalleRepository } from 'src/salle/salle.repository';
import { CentreModule } from 'src/centre/centre.module';
import { CentreRepository } from 'src/centre/centre.repository';
import { FormationModule } from 'src/formation/formation.module';
import { FormationRepository } from 'src/formation/formation.repository';
import { FormationService } from 'src/formation/formation.service';
import { SalleModule } from 'src/salle/salle.module';
import { CentreService } from 'src/centre/centre.service';
@Module({
  imports: [TypeOrmModule.forFeature([Seance])],
  controllers: [SeanceController],
  providers: [
    SeanceService,
    SeanceRepository,
    CentreRepository,
    ProfRepository,
    FormationRepository,
    SalleRepository,


  ],
})
export class SeanceModule {}
