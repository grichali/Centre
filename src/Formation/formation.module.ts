import { Module } from '@nestjs/common';
import { FormationController } from './formation.controller';
import { FormationService } from './formation.service';
import { Formation } from './formation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfRepository } from 'src/Prof/prof.repository';
import { FormationRepository } from './formation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Formation,FormationRepository])],
  controllers: [FormationController],
  providers: [FormationService, FormationRepository, ProfRepository],
})
export class FormationModule {}
