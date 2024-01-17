/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('User Roles:ll');
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    console.log(roles[0]);
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    if (!token) {
      console.log('RolesGuard - No token found');
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: jwtConstants.secret
      });
      request.user = decoded; // Corrected to set user property in the request
      console.log('User Roles:', request.user.payload.role);
      const userRoles = request.user.payload.role; // Corrected to access user's roles property

      return userRoles && roles.includes(userRoles);
    } catch (error) {
      console.error('RolesGuard - Error verifying token:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }

  extractTokenFromRequest(request: any) {
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
}
