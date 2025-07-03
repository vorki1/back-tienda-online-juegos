import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, comparePasswords } from '../utils/hash';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import { RegisterDto} from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async login(dto: LoginDto) {
  // Buscar usuario por email en la base de datos
  const user = await this.userModel.findOne({ email: dto.email }).exec();

  if (!user) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  // Si el usuario existe, validar la contraseña
  if (!(await comparePasswords(dto.password, user.contrasenia))) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  // Generar token JWT
  const token = this.jwtService.sign({
    id: user._id,
    email: user.email,
    rol: user.rol,
  });

  return {
    token,
    user: {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
  };
}

  async register(dto: RegisterDto) {
  const exists = await this.userModel.findOne({ email: dto.email }).exec();
  if (exists) {
    throw new UnauthorizedException('El email ya está registrado');
  }
  const hashedPassword = await hashPassword(dto.password);
  const user = new this.userModel({
    nombre: dto.nombre,
    email: dto.email,
    contrasenia: hashedPassword,
    rol: dto.rol, // Siempre 'usuario' por seguridad
  });
  await user.save();
  return {
    id: user._id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
  };
  }
}