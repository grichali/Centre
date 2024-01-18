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
import { AdminRepository } from 'src/admin/admin.repository';
import { AdminService } from 'src/admin/admin.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({imports: [JwtModule,PassportModule]
  ,
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
    JwtModule,
    
    JwtStrategy
  ],
})
export class AuthModule {}
