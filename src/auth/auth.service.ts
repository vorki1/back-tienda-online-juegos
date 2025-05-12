import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, comparePasswords } from '../utils/hash';
import { LoginDto } from './dto/login.dto';

interface User {
  id: number;
  nombre: string;
  email: string;
  contrasenia: string;
  rol: 'admin' | 'usuario';
}

@Injectable()
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      nombre: 'Admin',
      email: 'admin@example.com',
      contrasenia: '$2b$10$0dzDb.XjYpL1tz/W7s1qO.ZtkvfYvJ0hFSP.qz2RgHcsbYph9mik6', // Contraseña: admin123 (hash de ejemplo)
      rol: 'admin',
    },
  ];

  private nextId = 2;

  constructor(private jwtService: JwtService) {}

  async login(dto: LoginDto) {
    // Buscar usuario por email
    let user = this.users.find((u) => u.email === dto.email);

    if (!user) {
      // Si el email no está registrado, crear un nuevo usuario
      const hashedPassword = await hashPassword(dto.password);
      user = {
        id: this.nextId++,
        nombre: 'Usuario',
        email: dto.email,
        contrasenia: hashedPassword,
        rol: 'usuario', // Por defecto, el rol es "usuario"
      };
      this.users.push(user);
    } else {
      // Si el usuario existe, validar la contraseña
      if (!(await comparePasswords(dto.password, user.contrasenia))) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
    }

    // Generar token JWT
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      rol: user.rol,
    });

    return {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    };
  }
}

  