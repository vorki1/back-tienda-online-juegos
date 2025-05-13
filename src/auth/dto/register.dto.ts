import { IsEmail, IsString, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsString()
  nombre!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(['admin', 'usuario'], { message: 'Rol no válido. Debe ser "admin" o "usuario".' })
  rol!: 'admin' | 'usuario';
}