import { Module } from '@nestjs/common';
import { FormationController } from './formation.controller';
import { FormationService } from './formation.service';
import { Formation } from './formation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfRepository } from 'src/Prof/prof.repository';
import { FormationRepository } from './formation.repository';
import { SeanceRepository } from 'src/seance/seance.repository';
import { SeanceService } from 'src/seance/seance.service';
import { SalleRepository } from 'src/salle/salle.repository';
import { CentreRepository } from 'src/centre/centre.repository';
import { SeanceResevRepository } from 'src/seance_reserv/seance_reserv.repository';
 
@Module({
  imports: [TypeOrmModule.forFeature([Formation])],
  controllers: [FormationController],
  providers: [
    FormationService,
    FormationRepository,
    ProfRepository,
    SeanceRepository,
    SeanceService,
    SalleRepository,
    CentreRepository,
    SeanceResevRepository,
  ],
})
export class FormationModule {}
 