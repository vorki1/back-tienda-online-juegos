import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtiene los roles requeridos desde los metadatos
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permite el acceso
    }

    // Obtiene el usuario desde el contexto de la solicitud
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verifica si el usuario tiene al menos uno de los roles requeridos
    const hasRole = requiredRoles.some((role) => user?.rol?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('No tienes permisos para acceder a esta ruta');
    }

    return true;
  }
}