import { Controller, Get } from '@nestjs/common';
import { ProductsService } from '../products/products.service'; 

@Controller('admin')
export class AdminController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('top-selling-products')
  getTopSellingProducts() {
    return this.productsService.getTopSellingProducts();
  }

  @Get('top-categories')
  getTopCategories() {
    return this.productsService.getTopCategories();
  }

  @Get('top-rated-products')
  getTopRatedProducts() {
    return this.productsService.getTopRatedProducts();
  }

  @Get('product-sales')
  getProductSales() {
    return this.productsService.getProductSales();
  }
}