import { Module } from '@nestjs/common';
import { ProfService } from './prof.service';
import { ProfController } from './prof.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfRepository } from './prof.repository';
import { Prof } from './prof.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SeanceResevRepository } from 'src/seance_reserv/seance_reserv.repository';


@Module({
  imports:[TypeOrmModule.forFeature([Prof])],
  providers: [ProfService,ProfRepository,SeanceResevRepository],
  controllers: [ProfController],
}) 
export class ProfModule {} 
  