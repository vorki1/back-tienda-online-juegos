import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // Aplica los guards de JWT y roles a todas las rutas del controlador
export class AdminController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('top-selling-products')
  @Roles('admin') // Solo los usuarios con el rol "admin" pueden acceder
  getTopSellingProducts() {
    return this.productsService.getTopSellingProducts();
  }

  @Get('top-categories')
  @Roles('admin') // Solo los usuarios con el rol "admin" pueden acceder
  getTopCategories() {
    return this.productsService.getTopCategories();
  }

  @Get('top-rated-products')
  @Roles('admin') // Solo los usuarios con el rol "admin" pueden acceder
  getTopRatedProducts() {
    return this.productsService.getTopRatedProducts();
  }

  @Get('product-sales')
  @Roles('admin') // Solo los usuarios con el rol "admin" pueden acceder
  getProductSales() {
    return this.productsService.getProductSales();
  }
}