/* eslint-disable prettier/prettier */
/*import { Injectable, CanActivate, ExecutionContext, UnauthorizedException,  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    console.log("houda")
    console.log("houda",roles)
    if (!roles) {
      console.log("soso")
      return true;
    }
    console.log("SADI9A")
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }
    const userRole = request.user.role; // Assuming roles are attached to the user object

    return userRole && roles.includes(userRole);
  }
}*/