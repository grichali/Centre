import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LogInDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(loginDto : LogInDTO): Promise<any> {
    const user = await this.authService.loginEtudiant(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}