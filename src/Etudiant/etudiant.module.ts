import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from './etudiant.entity';
import { EtudiantRepository } from './etudiant.repository';

@Module({
  imports:[TypeOrmModule.forFeature([EtudiantRepository])],
  providers: [EtudiantService],
  controllers: [EtudiantController]
})
export class EtudiantModule {}
  