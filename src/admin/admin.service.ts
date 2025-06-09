import { Injectable } from '@nestjs/common';
import { ProductoService } from '../producto/producto.service';

@Injectable()
export class AdminService {
  constructor(private readonly productoService: ProductoService) {}

  async getTopSellingProducts(limit: number = 5) {
    const productos = await this.productoService.findAll();
    return productos
      .sort((a, b) => (b.cantidadVentas || 0) - (a.cantidadVentas || 0))
      .slice(0, limit);
  }

  async getTopCategories(limit: number = 5) {
    const productos = await this.productoService.findAll();
    const categorySales = new Map<string, number>();

    productos.forEach((producto) => {
      (producto.categorias || []).forEach((categoria) => {
        categorySales.set(
          categoria,
          (categorySales.get(categoria) || 0) + (producto.cantidadVentas || 0),
        );
      });
    });

    return Array.from(categorySales.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([categoria, ventas]) => ({ categoria, ventas }));
  }

  async getTopRatedProducts(limit: number = 5) {
    const productos = await this.productoService.findAll();
    return productos
      .filter(p => p.cantidadValoraciones > 0)
      .sort((a, b) => (b.promedioValoracion || 0) - (a.promedioValoracion || 0))
      .slice(0, limit);
  }

  async getProductSales() {
    const productos = await this.productoService.findAll();
    return productos.map((producto) => ({
      nombre: producto.nombre,
      ventas: producto.cantidadVentas || 0,
    }));
  }
}