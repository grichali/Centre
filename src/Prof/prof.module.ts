import { Module } from '@nestjs/common';
import { ProfService } from './prof.service';
import { ProfController } from './prof.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfRepository } from './prof.repository';
import { Prof } from './prof.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports:[TypeOrmModule.forFeature([Prof]),
  PassportModule.register({
    defaultStrategy:'jwt'
  }),
  JwtModule.register({
    secret: 'hey123@@',
    signOptions:{
      expiresIn : 3600,
    }
  })
],
  providers: [ProfService,ProfRepository],
  controllers: [ProfController]
}) 
export class ProfModule {} 
  