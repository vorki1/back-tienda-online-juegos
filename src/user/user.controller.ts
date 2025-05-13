import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ProductsService } from '../products/products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard) // Aplica los guards de JWT y roles a todas las rutas del controlador
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly productsService: ProductsService, // Inyección de dependencia
  ) {}

  @Post()
  @Roles('admin') // Solo los usuarios con el rol "admin" pueden crear usuarios
  create(@Body() createUserDto: any) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('admin') // Solo los usuarios con el rol "admin" pueden listar todos los usuarios
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user') // Los usuarios con rol "admin" o "user" pueden acceder a esta ruta
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin') // Solo los usuarios con el rol "admin" pueden actualizar usuarios
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin') // Solo los usuarios con el rol "admin" pueden eliminar usuarios
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get(':userId/purchases')
  @Roles('user') // Solo los usuarios con el rol "user" pueden acceder a su historial de compras
  getUserPurchases(@Param('userId') userId: string) {
    return this.productsService.getUserPurchases(Number(userId));
  }
}