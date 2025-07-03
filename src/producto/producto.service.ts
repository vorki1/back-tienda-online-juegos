import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from './producto.schema';
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

  async findOneById(id: string) {
    return this.productoModel.findById(id).exec();
  }

  comprarProducto(compraProductoDto: CompraProductoDto) {
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
      promedioValoracion: Number(producto.promedioValoracion),
      cantidadValoraciones: producto.cantidadValoraciones,
      comentarios: producto.comentarios,
    };
  }

  async importarExcel(file: Express.Multer.File) {
    console.log('Importando archivo Excel...');
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });
    const filaDatos = datos.slice(1); // Ignorar la primera fila (cabecera)
    for (const fila of filaDatos) {
      const nombre = fila[0];
      if (!nombre) {
        console.warn('Nombre del producto vacío, saltando fila');
        continue;
      }
      const categorias = fila[1].split(',').map(cat => cat.trim());
      const precio = fila[2];
      const stock = fila[3];
      const imageBase64 = fila[4];
      console.log(`Nombre: ${nombre}, Categoría: ${categorias}, Precio: ${precio}, Stock: ${stock}, ImageUrl`);

      const existProducto = await this.findOneByNombre(nombre);
      const imageUrl = await this.imagekitService.uploadFromBase64(imageBase64, `${nombre}.jpg`);
      if (existProducto) {
        console.log(`El producto ${nombre} ya existe, actualizando...`);
        await this.productoModel.updateOne(
          { nombre },
          { categorias, precio, stock, imageUrl },
        );
      } else {
        console.log(`Creando nuevo producto: ${nombre}`);
        const nuevoProducto = new this.productoModel({
          nombre,
          categorias,
          precio,
          stock,
          imageUrl,
        });
        await nuevoProducto.save();
      }
    }
    return 'Archivo Excel importado correctamente';
  }

  async exportarExcel() {
    const productos = await this.productoModel.find().lean().exec();
    const datosExcel = [
      ['Nombre', 'Categorias', 'Precio', 'Stock', 'ImagenUrl'],
      ...productos.map(prod => [
        prod.nombre,
        prod.categorias.join(', '),
        prod.precio,
        prod.stock,
        prod.imageUrl || '',
      ]),
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(datosExcel);
    XLSX.utils.book_append_sheet(wb, ws, 'Productos');
    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    return excelBuffer;
  }

  async agregarComentario(id: string, comentario: string, valoracion?: number) {
    const producto = await this.productoModel.findById(id);
    if (!producto) throw new Error('Producto no encontrado');
    producto.comentarios.push(comentario);
    if (valoracion) {
      producto.cantidadValoraciones = (producto.cantidadValoraciones || 0) + 1;
      producto.promedioValoracion =
        ((producto.promedioValoracion || 0) * (producto.cantidadValoraciones - 1) + valoracion) /
        producto.cantidadValoraciones;
    }
    await producto.save();
    return {
      comentarios: producto.comentarios,
      promedioValoracion: Number(producto.promedioValoracion),
      cantidadValoraciones: producto.cantidadValoraciones,
    };
  }

  async valorarProducto(id: string, valoracion: number) {
    const producto = await this.productoModel.findById(id);
    if (!producto) throw new Error('Producto no encontrado');
    producto.cantidadValoraciones = (producto.cantidadValoraciones || 0) + 1;
    producto.promedioValoracion =
      ((producto.promedioValoracion || 0) * (producto.cantidadValoraciones - 1) + valoracion) /
      producto.cantidadValoraciones;
    await producto.save();
    return {
      promedioValoracion: Number(producto.promedioValoracion),
      cantidadValoraciones: producto.cantidadValoraciones,
      producto,
    };
  }
}