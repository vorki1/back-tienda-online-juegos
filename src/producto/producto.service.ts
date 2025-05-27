import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Producto } from './producto.schema';
import { Model } from 'mongoose';
import * as XLSX from 'xlsx';

@Injectable()
export class ProductoService {
  constructor() {
  }
  @InjectModel(Producto.name)
  private readonly productoModel: Model<Producto>;

  create(createProductoDto: CreateProductoDto) {
    console.log(createProductoDto);
    const productoCreado = new this.productoModel(createProductoDto);
    return productoCreado.save();
  }
  importarExcel(file: Express.Multer.File) {
    console.log(file);
    // Aquí puedes implementar la lógica para importar el archivo Excel
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });
    for (const fila of datos) {
      console.log(fila);
    }

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
