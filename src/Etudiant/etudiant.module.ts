import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from './etudiant.entity';
import { EtudiantRepository } from './etudiant.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
  TypeOrmModule.forFeature([Etudiant]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  ], 
  providers: [EtudiantService,EtudiantRepository],
  controllers: [EtudiantController],
})
export class EtudiantModule {}
    