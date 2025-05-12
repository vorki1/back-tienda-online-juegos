import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [AdminController],
  providers: [ProductsService], // Importamos el servicio de productos
})
export class AdminModule {}