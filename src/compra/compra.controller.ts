import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';

@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  // Ruta para realizar una compra (carrito)
  @Post()
  async crearCompra(@Body() createCompraDto: CreateCompraDto) {
    return this.compraService.crearCompra(createCompraDto);
  }

  // Ruta para historial de compras de usuario logeado
  @Get('historial/:userId')
  async historial(@Param('userId') userId: string) {
    return this.compraService.historialCompras(userId);
  }
}