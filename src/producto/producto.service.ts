import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Producto } from './producto.schema';
import { Model } from 'mongoose';

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
