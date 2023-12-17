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
import { CentreService } from 'src/centre/centre.service';
import { Centre } from 'src/Centre/centre.entity';
import { CentreRepository } from 'src/centre/centre.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdminRepository } from 'src/admin/admin.repository';
import { AdminService } from 'src/admin/admin.service';

@Module({imports: [
  JwtModule.register({
    secret: 'hah123@@', 
    signOptions: { expiresIn: '1h' }, 
  }),
],
  controllers: [AuthController],
  providers: [
    AuthService,
    ProfService,
    EtudiantService,
    CentreService,
    AdminService,
    ProfRepository,
    EtudiantRepository,
    CentreRepository,
    AdminRepository,
  ],
})
export class AuthModule {}
