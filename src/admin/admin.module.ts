import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';


@Module({
  imports:[TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
