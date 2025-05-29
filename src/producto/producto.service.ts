import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Producto } from './producto.schema';
import { Model } from 'mongoose';
import * as XLSX from 'xlsx';
import { ImagekitService } from '../imagekit/imagekit.service';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name)
    private productoModel: Model<Producto>,
    private readonly imagekitService: ImagekitService,
  ) {}
  

  create(createProductoDto: CreateProductoDto) {
    console.log(createProductoDto);
    const productoCreado = new this.productoModel(createProductoDto);
    return productoCreado.save();
  }
  async importarExcel(file: Express.Multer.File) {
    console.log('Importando archivo Excel...');
    // Aquí puedes implementar la lógica para importar el archivo Excel
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });
    const filaDatos = datos.slice(1); // Ignorar la primera fila (cabecera)
    for (const fila of filaDatos) {
      const nombre = fila[0];
      const categoria = fila[1];
      const precio = fila[2];
      const imageBase64 = fila[3];
      console.log(`Nombre: ${nombre}, Categoría: ${categoria}, Precio: ${precio}, ImageUrl`);
      // Aqui comprobamos si la imagen ya existe
      const existe = await this.imagekitService.existsFile(`${nombre}.jpg`);
      if (existe) {
        console.log('El archivo ya existe, no se puede subir');
        // Aquí podrías manejar el caso en que el archivo ya existe, por ejemplo, actualizar el producto o ignorar
      } else {
        const imageUrl = await this.imagekitService.uploadFromBase64(imageBase64,`${nombre}.jpg`);
      }
    }
    console.log(await this.imagekitService.listarNombresDeArchivos())

    // Aquí se guardara los datos en la base de datos o realizar otras operaciones necesarias-------------------------------
    return 'Archivo Excel importado correctamente';
  }
  

  findAll() {
    return `This action returns all producto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
