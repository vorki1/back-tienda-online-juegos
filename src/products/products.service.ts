import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  // Métodos adaptados para MongoDB

  async getTopSellingProducts() {
    return this.productModel
      .find()
      .sort({ ventas: -1 })
      .limit(5)
      .exec();
  }

  async getTopCategories() {
    const products = await this.productModel.find().exec();
    const categorySales = new Map<string, number>();

    products.forEach((product) => {
      product.categorias.forEach((categoria) => {
        categorySales.set(
          categoria,
          (categorySales.get(categoria) || 0) + product.ventas,
        );
      });
    });

    return Array.from(categorySales.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([categoria, ventas]) => ({ categoria, ventas }));
  }

  async getTopRatedProducts() {
    return this.productModel
      .find({ cantidadValoraciones: { $gt: 0 } })
      .sort({ valoracion: -1 })
      .limit(5)
      .exec();
  }

  async getProductSales() {
    const products = await this.productModel.find().exec();
    return products.map((product) => ({
      nombre: product.nombre,
      ventas: product.ventas,
    }));
  }
 
}