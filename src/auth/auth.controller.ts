import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) // Devuelve un código de estado 200 en lugar del predeterminado 201
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}