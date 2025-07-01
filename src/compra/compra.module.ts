import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Compra, CompraSchema } from './compra.schema';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { Producto, ProductoSchema } from '../producto/producto.schema';
import { ProductoService } from '../producto/producto.service';
import { ImagekitModule } from '../imagekit/imagekit.module';
import { CarroModule } from 'src/carro/carro.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Compra.name, schema: CompraSchema },
      { name: Producto.name, schema: ProductoSchema },
    ]),
    ImagekitModule,
    CarroModule,
  ],
  controllers: [CompraController],
  providers: [CompraService, ProductoService],
  exports: [CompraService],
})
export class CompraModule {}