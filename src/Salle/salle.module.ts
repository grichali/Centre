import { Module } from '@nestjs/common';
import { SalleController } from './salle.controller';
import { SalleService } from './salle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salle } from './salle.entity';
import { SalleRepository } from './salle.repository';
import { CentreRepository } from 'src/centre/centre.repository';
import { SeanceRepository } from 'src/seance/seance.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Salle])],
  controllers: [SalleController],
  providers: [SalleService,SalleRepository,CentreRepository]
})
export class SalleModule {}
 