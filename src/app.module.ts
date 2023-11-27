import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfModule } from './prof/prof.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { SeanceModule } from './seance/seance.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports:[  TypeOrmModule.forRoot(typeOrmConfig), ProfModule, EtudiantModule, SeanceModule, ReviewModule ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
