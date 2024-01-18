import { Module } from '@nestjs/common';
import { JwtService, JwtModule as NestJwtModule } from '@nestjs/jwt';
import { FormationReserv } from 'src/formation_reserv/formation_reserv.entity';
import { jwtConstants } from './constants';
import { Etudiant } from 'src/Etudiant/etudiant.entity';

@Module({
  imports: [
    NestJwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    FormationReserv,
    Etudiant
  ],
})
export class JwtModule {}
