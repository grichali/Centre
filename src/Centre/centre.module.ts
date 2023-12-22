import { Module } from '@nestjs/common';
import { CentreService } from './centre.service';
import { CentreController } from './centre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentreRepository } from './centre.repository';
import { Centre } from './centre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Centre])],
  providers: [CentreService, CentreRepository],
  controllers: [CentreController],
})
export class CentreModule {}
