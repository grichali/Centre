/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';

@Module({
  imports: [NestJwtModule.registerAsync({
    useFactory: async (): Promise<JwtModuleOptions> => ({
      secret: 'hah123@@',
      signOptions: { expiresIn: '10h' },
    }),
  })],
  providers: [JwtService],
  exports: [NestJwtModule],
})
export class JwtModule {}
