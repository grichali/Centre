import { Module } from '@nestjs/common';
import { ProfService } from './prof.service';
import { ProfController } from './prof.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfRepository } from './prof.repository';
import { Prof } from './prof.entity';
import { Seance } from 'src/Seance/seance.entity';
import { SeanceModule } from 'src/seance/seance.module';
import { SeanceService } from 'src/seance/seance.service';
import { SeanceRepository } from 'src/seance/seance.repository';

@Module({
  imports:[TypeOrmModule.forFeature([ProfRepository,Prof]),
],
  providers: [ProfService,SeanceService,SeanceRepository],
  controllers: [ProfController]
}) 
export class ProfModule {}
 