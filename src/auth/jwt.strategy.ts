import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del encabezado Authorization
      ignoreExpiration: false, // Rechaza tokens expirados
      secretOrKey: process.env.JWT_SECRET || 'supersecret', // Usa una clave secreta desde variables de entorno
    });
  }

  validate(payload: { id: number; email: string; rol: string }) {
    // Devuelve los datos del usuario que estarán disponibles en el contexto de la solicitud
    return {
      userId: payload.id,
      email: payload.email,
      rol: payload.rol,
    };
  }
}