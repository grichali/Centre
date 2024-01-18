/* eslint-disable prettier/prettier */
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService
    ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard - canActivate - Start');

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);


    if (!token) {
      console.log('JwtAuthGuard - No token found');
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = this.jwtService.verify(token,
      {
        secret: jwtConstants.secret
      });
      request['user'] = decoded;
      console.log('JwtAuthGuard - Token verified successfully : ');
      console.log(request.user)
      return super.canActivate(context);
    } catch (error) {
      console.error('JwtAuthGuard - Error verifying token:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromRequest(request): string {
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return null;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return token;
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

}
