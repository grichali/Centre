import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from './review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { FormationRepository } from 'src/formation/formation.repository';
import { EtudiantRepository } from 'src/etudiant/etudiant.repository';
import { ProfRepository } from 'src/Prof/prof.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    ReviewRepository,
    FormationRepository,
    EtudiantRepository,
    ProfRepository,
  ],
})
export class ReviewModule {}