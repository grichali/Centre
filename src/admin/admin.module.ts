import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { ProfRepository } from 'src/Prof/prof.repository';
import { EtudiantRepository } from 'src/etudiant/etudiant.repository';
import { CentreRepository } from 'src/centre/centre.repository';
import { CentreService } from 'src/centre/centre.service';
import { EtudiantService } from 'src/etudiant/etudiant.service';
import { ProfService } from 'src/Prof/prof.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, ProfRepository,EtudiantRepository, CentreRepository,CentreService,EtudiantService,ProfService],
})
export class AdminModule {}
