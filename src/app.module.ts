import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfModule } from './prof/prof.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { SeanceModule } from './seance/seance.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { CentreModule } from './centre/centre.module';

@Module({
  imports:[  TypeOrmModule.forRoot(typeOrmConfig),
     ProfModule, EtudiantModule,
      SeanceModule, ReviewModule,AuthModule, CentreModule ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
