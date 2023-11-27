import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prof } from 'src/prof/prof.entity'; 
import { ProfService } from 'src/prof/prof.service';
import { EtudiantService } from 'src/etudiant/etudiant.service';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import { ProfRepository } from 'src/prof/prof.repository';
import { EtudiantRepository } from 'src/etudiant/etudiant.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prof,Etudiant]),
  ],
  controllers: [AuthController],
  providers: [AuthService , ProfService , EtudiantService, ProfRepository,EtudiantRepository],
})
export class AuthModule {} 
