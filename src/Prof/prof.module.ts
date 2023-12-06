import { Module } from '@nestjs/common';
import { ProfService } from './prof.service';
import { ProfController } from './prof.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfRepository } from './prof.repository';
import { Prof } from './prof.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Prof]),
],
  providers: [ProfService,ProfRepository],
  controllers: [ProfController]
}) 
export class ProfModule {} 
 