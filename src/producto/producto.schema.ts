import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Producto extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: [String], default: [] })
  categorias: string[];

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  stock: number;

  @Prop()
  imageUrl: string;

  @Prop()
  valoracionId: number;

  @Prop({ default: 0 })
  cantidadVentas: number;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);