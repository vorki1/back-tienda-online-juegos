import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { AgregarCarroDto } from './agregar-carro.dt';

@Injectable()
export class CarroService {
  constructor(
    @Inject('REDIS_CLIENT') private redis: Redis) {}


  async obtenerCarro(usuarioId: string) {
    return await this.redis.get(`carro:${usuarioId}`);
  }

  
  async agregarProducto(usuarioId: string, datos: AgregarCarroDto) {
    const clave = `carro:${usuarioId}`;
    const carrito = await this.redis.get(clave);
    const productoJson = {
      productoId: datos.productoId,
      cantidad: datos.cantidad
    }
    await console.log(`Carro actual del usuario ${usuarioId}: ${productoJson.productoId}, cantidad: ${productoJson.cantidad}`);
    //Caso 1: si el carro no existe, lo creamos
    if (!carrito) {
      const nuevoCarro = '[]';
      const carroActualJson = JSON.parse(nuevoCarro);
      carroActualJson.push(productoJson);
      const nuevoCarroJson = JSON.stringify(carroActualJson);
      await this.redis.set(clave, nuevoCarroJson, 'EX', 1800);//EX expiración de 1/2 hora
      return await this.redis.get(clave);
    }
    else{
      //Cuando el carro ya existe
      const carroActualJson = JSON.parse(carrito);
      const productoExistente = carroActualJson.find((producto: any) => producto.productoId === productoJson.productoId);
      if (productoExistente) {
        //Caso 2: si el carro ya existe, verificamos si el producto ya está en el carro
        productoExistente.cantidad = productoJson.cantidad;
        const nuevoCarroJson = JSON.stringify(carroActualJson);
        await this.redis.set(clave, nuevoCarroJson, 'EX', 1800);//EX expiración de 1/2 hora
        return await this.redis.get(clave);
      }
      //Caso 3: si el carro ya existe y el producto no está en el carro, lo agregamos
      carroActualJson.push(productoJson);
      const nuevoCarroJson = JSON.stringify(carroActualJson);
      await this.redis.set(clave, nuevoCarroJson, 'EX', 1800);//EX expiración de 1/2 hora
      return await this.redis.get(clave);
    }
  }

  async resetearCarro(usuarioId: string) {
    const clave = `carro:${usuarioId}`;
    const carro = await this.redis.del(clave);
    console.log(`Carro del usuario ${usuarioId} reseteado: ${carro}`);
    return { mensaje: 'Carro reseteado' };
  }
}