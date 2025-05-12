import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
  {
    id: 1,
    nombre: 'Producto 1',
    categorias: ['Categoría 1', 'Categoría 2'],
    precio: 100,
    stock: 50,
    urlImagen: 'https://example.com/producto1.jpg',
    valoracion: 4.5,
    comentarios: [],
    ventas: 10, // Número de veces que se ha vendido este producto
    totalValoraciones: 45, // Suma de todas las valoraciones recibidas
    cantidadValoraciones: 10, // Número de valoraciones recibidas
  },
  {
    id: 2,
    nombre: 'Producto 2',
    categorias: ['Categoría 3'],
    precio: 200,
    stock: 30,
    urlImagen: 'https://example.com/producto2.jpg',
    valoracion: 4.0,
    comentarios: [],
    ventas: 5,
    totalValoraciones: 20,
    cantidadValoraciones: 5,
  },
];
    private userPurchases = [
        {
        userId: 1,
        compras: [
            { productoId: 1, cantidad: 2, fecha: '2023-10-01' },
            { productoId: 2, cantidad: 1, fecha: '2023-10-02' },
        ],
        },
        {
        userId: 2,
        compras: [
            { productoId: 1, cantidad: 1, fecha: '2023-10-03' },
        ],
        },
    ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  getUserPurchases(userId: number) {
    const user = this.userPurchases.find((u) => u.userId === userId);
    if (!user) {
        return [];
        }
        return user.compras.map((compra) => {
            const producto = this.products.find((p) => p.id === compra.productoId);
            return {
            ...compra,
            nombre: producto?.nombre,
            categorias: producto?.categorias,
            };
        });
    }

  getTopSellingProducts() {
    return this.products
        .sort((a, b) => b.ventas - a.ventas)
        .slice(0, 5); // Devuelve los 5 productos más vendidos
    }

  getTopCategories() {
        const categorySales = new Map<string, number>();

        this.products.forEach((product) => {
            product.categorias.forEach((categoria) => {
            categorySales.set(
                categoria,
                (categorySales.get(categoria) || 0) + product.ventas,
            );
            });
        });

        return Array.from(categorySales.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5); // Devuelve las 5 categorías más vendidas
        }

  getTopRatedProducts() {
        return this.products
            .filter((p) => p.cantidadValoraciones > 0) // Solo productos con valoraciones
            .sort((a, b) => b.valoracion - a.valoracion)
            .slice(0, 5); // Devuelve los 5 productos con mejor valoración
        }

  getProductSales() {
        return this.products.map((product) => ({
            nombre: product.nombre,
            ventas: product.ventas,
        }));
    }

}