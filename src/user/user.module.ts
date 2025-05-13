import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [UserController],
  providers: [ProductsService], // Registramos el servicio de productos
})
export class UserModule {}