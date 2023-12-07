import { Module } from '@nestjs/common';
import { FormationController } from './formation.controller';

@Module({
  controllers: [FormationController]
})
export class FormationModule {}
