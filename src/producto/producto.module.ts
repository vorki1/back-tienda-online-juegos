import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './producto.schema';
import { ImagekitModule } from 'src/imagekit/imagekit.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Producto.name, schema: ProductoSchema}]),
    ImagekitModule,
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
