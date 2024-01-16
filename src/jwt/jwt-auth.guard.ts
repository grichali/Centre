import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

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
      const decoded = this.jwtService.verify(token,{ secret: 'hah123@@'});
      request.user = decoded;
      console.log('JwtAuthGuard - Token verified successfully : ');
      console.log(request.user)
      return super.canActivate(context);
    } catch (error) {
      console.error('JwtAuthGuard - Error verifying token:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromRequest(request): string {
    console.log('JwtAuthGuard - extractTokenFromRequest - Start');

    
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      console.log('JwtAuthGuard - No authorization header');
      return null;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer' || !token) {
      console.log('JwtAuthGuard - Invalid authorization header');
      return null;
    }

    console.log('JwtAuthGuard - Token extracted successfully');
    console.log(token);
    return token;
  }
}
