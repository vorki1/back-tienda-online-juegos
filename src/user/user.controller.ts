import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from '../products/products.service'; 

@Controller('user')
export class UserController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':userId/purchases')
  getUserPurchases(@Param('userId') userId: string) {
    return this.productsService.getUserPurchases(Number(userId));
  }
}