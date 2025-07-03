// carro.controller.ts
import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { CarroService } from './carro.service';
import { AgregarCarroDto } from './agregar-carro.dt';

@Controller('carro')
export class CarroController {
  constructor(private readonly carroService: CarroService) {}

  @Get(':usuarioId')
  async obtener(@Param('usuarioId') usuarioId: string) {
    return await this.carroService.obtenerCarro(usuarioId);
  } //no lo usa front
  
  @Post(':usuarioId')
  async agregar(@Param('usuarioId') usuarioId: string, @Body() AgregarCarroDto: AgregarCarroDto) {
    
    return await this.carroService.agregarProducto(usuarioId, AgregarCarroDto);
  }
  @Delete(':usuarioId')
  async resetear(@Param('usuarioId') usuarioId: string) {
    return await this.carroService.resetearCarro(usuarioId);
  }
}
