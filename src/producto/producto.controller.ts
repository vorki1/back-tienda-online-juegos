import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompraProductoDto } from './dto/compra-producto.dto';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}
  //Metodo para crear un producto manualmente
  /* @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  } */


  //Metodo para importar productos desde un archivo Excel
  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  importarExcel(@UploadedFile() file: Express.Multer.File) {
    return this.productoService.importarExcel(file);
  }
  //Para obtener todos los productos
  @Get()
  findAll() {
    return this.productoService.findAll();
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
}
