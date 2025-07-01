import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Compra } from './compra.schema';
import { CreateCompraDto } from './dto/create-compra.dto';
import { Producto } from '../producto/producto.schema';
import { ProductoService } from '../producto/producto.service';
import { CarroService } from 'src/carro/carro.service';

@Injectable()
export class CompraService {
  constructor(
    @InjectModel(Compra.name) private compraModel: Model<Compra>,
    private readonly productoService: ProductoService,
    @InjectModel(Producto.name) private productoModel: Model<Producto>,
    private readonly carroService: CarroService,
  ) {}

  async crearCompra(createCompraDto: CreateCompraDto) {
    for (const item of createCompraDto.productos) {
      const producto = await this.productoModel.findById(item.productId);
      if (!producto) throw new NotFoundException('Producto no encontrado');
      if (producto.stock < item.cantidad) throw new BadRequestException('Stock insuficiente');

      // Actualiza stock y ventas
      producto.stock -= item.cantidad;
      producto.cantidadVentas += item.cantidad;

      // Actualiza valoraciones y comentarios
      const totalValoraciones = producto.cantidadValoraciones + 1;
      producto.promedioValoracion = (
        (producto.promedioValoracion * producto.cantidadValoraciones + item.valoracion) / totalValoraciones
      );
      producto.cantidadValoraciones = totalValoraciones;

      // Guarda solo los últimos 10 comentarios
      if (item.comentario) {
        producto.comentarios.unshift(item.comentario);
        if (producto.comentarios.length > 10) {
          producto.comentarios = producto.comentarios.slice(0, 10);
        }
      }

      await producto.save();
      //Nueva linea para resetear el carro de compras
      await this.carroService.resetearCarro(createCompraDto.userId)
    }

    // Crear la compra
    const compra = new this.compraModel({
      userId: createCompraDto.userId || null,
      productos: createCompraDto.productos,
      fecha: new Date(),
    });
    return compra.save();
  }

  async historialCompras(userId: string) {
    return this.compraModel
      .find({ userId })
      .populate('productos.productId')
      .sort({ fecha: -1 })
      .exec();
  }
}