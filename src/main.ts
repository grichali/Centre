import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

