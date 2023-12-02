import { Module } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { SeanceController } from './seance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeanceRepository } from './seance.repository';
import { Seance } from './seance.entity';
import { ProfService } from 'src/prof/prof.service';
import { ProfModule } from 'src/prof/prof.module';

@Module({
  controllers: [SeanceController],
  providers: [SeanceService]
})
export class SeanceModule {} 
