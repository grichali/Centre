import { Module } from '@nestjs/common';
import { JwtService, JwtModule as NestJwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    NestJwtModule.register({
      secret: 'hah123@@',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers:[
    JwtService 
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}
