import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Llama al método `canActivate` del guard base (AuthGuard)
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // Si hay un error o el usuario no está autenticado, lanza una excepción
    if (err || !user) {
      throw err || new UnauthorizedException('No autorizado');
    }
    return user; // Devuelve el usuario autenticado
  }
}