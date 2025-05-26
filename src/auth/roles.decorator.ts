import { SetMetadata } from '@nestjs/common';

// Clave para almacenar los roles en el contexto de la solicitud
export const ROLES_KEY = 'roles';

// Decorador para asignar roles a rutas o controladores
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);