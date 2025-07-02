import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Producto } from './producto.schema';
import { Model } from 'mongoose';
import * as XLSX from 'xlsx';
import { ImagekitService } from '../imagekit/imagekit.service';
import { CompraProductoDto } from './dto/compra-producto.dto';

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
  

  findAll() {
    return this.productoModel.find().exec();
  }

  findOneByNombre(nombre: string) {
    return this.productoModel.findOne({ nombre }).exec();
  }

  comprarProducto(compraProductoDto: CompraProductoDto) {
    //El comentario de abajo te muestra el nombre del producto y el stock a reducir
    //console.log(`Comprando producto: ${compraProductoDto.nombre}, Stock a reducir: ${compraProductoDto.stock}`);
    const nombreProducto = compraProductoDto.nombre;
    return this.productoModel.findOneAndUpdate(
      { nombre: nombreProducto },
      { $inc: { stock: -compraProductoDto.stock } },
      { new: true },
    ).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }

    async getValoracionesYComentarios(productId: string) {
    const producto = await this.productoModel.findById(productId).exec();
    if (!producto) throw new Error('Producto no encontrado');
    return {
      promedioValoracion: producto.promedioValoracion,
      cantidadValoraciones: producto.cantidadValoraciones,
      comentarios: producto.comentarios,
    };
  }

  //Palta debera pescar la imagen del excel, subirlo a imagekit y mandar la url de la nube y todo el excel al backend
  async importarExcel(file: Express.Multer.File) {
    console.log('Importando archivo Excel...');
    // Aquí puedes implementar la lógica para importar el archivo Excel
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });
    const filaDatos = datos.slice(1); // Ignorar la primera fila (cabecera)
    for (const fila of filaDatos) {
      const nombre = fila[0];
      if (!nombre) {
        console.warn('Nombre del producto vacío, saltando fila');
        continue; // Saltar filas sin nombre
      }
      const categorias = fila[1].split(',').map(cat => cat.trim()); // Asumiendo que las categorías están separadas por comas
      const precio = fila[2];
      const stock = fila[3];
      const imageBase64 = fila[4];
      console.log(`Nombre: ${nombre}, Categoría: ${categorias}, Precio: ${precio}, Stock: ${stock}, ImageUrl`);

      const existProducto = await this.findOneByNombre(nombre);
      const imageUrl = await this.imagekitService.uploadFromBase64(imageBase64,`${nombre}.jpg`);
      if (existProducto) {
        console.log(`El producto ${nombre} ya existe, actualizando...`);
        // Aquí podrías actualizar el producto si ya existe
        await this.productoModel.updateOne(
          { nombre },
          { categorias, precio,stock, imageUrl },
        );
      } else {
        console.log(`Creando nuevo producto: ${nombre}`);
        
        const nuevoProducto = new this.productoModel({
          nombre,
          categorias,
          precio,
          stock, // Asignar un valor por defecto o manejarlo según tu lógica
          imageUrl,
        });
        await nuevoProducto.save();
      }
    }   
    return 'Archivo Excel importado correctamente';
  }
  
  async exportarExcel() {
    const productos = await this.productoModel.find().lean().exec();

    // Construimos un array de arrays con la cabecera y los datos
    const datosExcel = [
      ['Nombre', 'Categorias', 'Precio', 'Stock', 'ImagenUrl'], // encabezado
      ...productos.map(prod => [
        prod.nombre,
        prod.categorias.join(', '),
        prod.precio,
        prod.stock,
        prod.imageUrl || '',
      ]),
    ];

    // Creamos un workbook y una hoja
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(datosExcel);

    XLSX.utils.book_append_sheet(wb, ws, 'Productos');

    // Generamos el archivo Excel como buffer
    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    return excelBuffer;
  }
}
