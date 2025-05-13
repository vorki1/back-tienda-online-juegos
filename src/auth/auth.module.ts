import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configura Passport con JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret', // Usa variables de entorno para la clave secreta
      signOptions: { expiresIn: '1h' }, // Configura el tiempo de expiración del token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule], // Exporta JwtModule para que otros módulos puedan usarlo
})
export class AuthModule {}