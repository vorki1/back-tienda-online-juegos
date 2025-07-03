import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompraProductoDto } from './dto/compra-producto.dto';
import { Response } from 'express';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  //Metodo para importar productos desde un archivo Excel
  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  importarExcel(@UploadedFile() file: Express.Multer.File) {
    return this.productoService.importarExcel(file);
  }

  // Exportar productos a Excel
  @Get('excel/exportar')
  async exportarExcel(@Res() res: Response) {
    const buffer = await this.productoService.exportarExcel();

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=productos.xlsx',
      'Content-Length': buffer.length,
    });

    res.send(buffer);
  }

  //Para obtener todos los productos
  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  //Para buscar un producto por ID
  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.productoService.findOneById(id);
  }

  //Para buscar un producto por nombre
  @Get(':nombre')
  findOneByNombre(@Param('nombre') nombre: string) {
    return this.productoService.findOneByNombre(nombre);
  }

  @Patch()
  comprarProducto(@Body() compraProductoDto: CompraProductoDto) {
    return this.productoService.comprarProducto(compraProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
  
  @Get(':id/valoraciones')
  async getValoracionesYComentarios(@Param('id') id: string) {
    return this.productoService.getValoracionesYComentarios(id);
  }

  @Patch(':id/comentario')
  async agregarComentario(
    @Param('id') id: string,
    @Body() body: { comentario: string; valoracion?: number }
  ) {
    return this.productoService.agregarComentario(id, body.comentario, body.valoracion);
  }

  @Patch(':id/valoracion')
  async valorarProducto(@Param('id') id: string, @Body('valoracion') valoracion: number) {
    return this.productoService.valorarProducto(id, valoracion);
  }
}