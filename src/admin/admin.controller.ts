import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
//@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('top-selling-products')
  //@Roles('admin')
  getTopSellingProducts() {
    return this.adminService.getTopSellingProducts();
  }

  @Get('top-categories')
  //@Roles('admin')
  getTopCategories() {
    return this.adminService.getTopCategories();
  }

  @Get('top-rated-products')
  //@Roles('admin')
  getTopRatedProducts() {
    return this.adminService.getTopRatedProducts();
  }

  @Get('product-sales')
  //@Roles('admin')
  getProductSales() {
    return this.adminService.getProductSales();
  }
}