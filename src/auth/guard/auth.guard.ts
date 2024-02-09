import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly JwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('No existe token');
    }
  
    try {
      const payload = await this.JwtService.verifyAsync(token,{
        secret: process.env.JWT_SECRET
      });

      request.user = payload;
      
    } catch (error) {
      throw new UnauthorizedException('Token invalido');
    }


    return true;

  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;

  }


}
