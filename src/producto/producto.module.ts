import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './producto.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Producto.name, schema: ProductoSchema}]),
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
