/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfService } from 'src/prof/prof.service';
import { EtudiantService } from 'src/etudiant/etudiant.service';
import { ProfRepository } from 'src/prof/prof.repository';
import { EtudiantRepository } from 'src/etudiant/etudiant.repository';
import { CentreService } from 'src/centre/centre.service';
import { CentreRepository } from 'src/centre/centre.repository';
import { JwtModule } from '@nestjs/jwt';
import { AdminRepository } from 'src/admin/admin.repository';
import { AdminService } from 'src/admin/admin.service';
import {jwtConstants} from './constants';
import { ProfModule } from 'src/prof/prof.module';
import { EtudiantModule } from 'src/etudiant/etudiant.module';
import { CentreModule } from 'src/centre/centre.module';

@Module({imports: [
  ProfModule
  ,EtudiantModule,CentreModule,
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
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
