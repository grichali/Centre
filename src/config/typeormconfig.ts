// typeorm.config.ts
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'salles',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
  logging: true,
  autoLoadEntities:true,
};