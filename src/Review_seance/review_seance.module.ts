import { Module } from '@nestjs/common';
import { ReviewSeanceController } from './review_seance.controller';
import { ReviewSeanceService } from './review_seance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewSeance } from './review_seance.entity';
import { ReviewSeanceRepository } from './review_seance.repository';
import { EtudiantRepository } from 'src/etudiant/etudiant.repository';
import { SeanceRepository } from 'src/seance/seance.repository';

@Module({
  imports:[TypeOrmModule.forFeature([ReviewSeance])],
  controllers: [ReviewSeanceController],
  providers: [
  ReviewSeanceService,
  ReviewSeanceRepository,
  EtudiantRepository,
  SeanceRepository, 
]
})
export class ReviewSeanceModule {}
