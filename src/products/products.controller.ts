import { Controller, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard) // Aplica los guards de JWT y roles a todas las rutas del controlador
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }



   @Get(':id')
  @Roles('admin', 'user') // Permite acceso a usuarios con rol "admin" o "user"
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(Number(id));
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }
}