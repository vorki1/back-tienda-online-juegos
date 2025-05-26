import { IsEmail, IsString, IsEnum } from 'class-validator';

export enum Rol {
  ADMIN = 'admin',
  USUARIO = 'usuario',
}

export class RegisterDto {
  @IsString()
  nombre!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(Rol, { message: 'Rol no válido. Debe ser "admin" o "usuario".' })
  rol!: Rol;
}