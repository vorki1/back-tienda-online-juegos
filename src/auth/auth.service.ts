import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, comparePasswords } from '../utils/hash';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async login(dto: LoginDto) {
    // Buscar usuario por email en la base de datos
    let user = await this.userModel.findOne({ email: dto.email }).exec();

    if (!user) {
      // Si el email no está registrado, crear un nuevo usuario
      const hashedPassword = await hashPassword(dto.password);
      user = new this.userModel({
        nombre: 'Usuario',
        email: dto.email,
        contrasenia: hashedPassword,
        rol: 'usuario', // Por defecto, el rol es "usuario"
      });
      await user.save();
    } else {
      // Si el usuario existe, validar la contraseña
      if (!(await comparePasswords(dto.password, user.contrasenia))) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
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
}