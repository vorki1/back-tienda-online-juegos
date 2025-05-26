import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: [String], default: [] })
  categorias: string[];

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  stock: number;

  @Prop()
  urlImagen: string;

  @Prop({ default: 0 })
  valoracion: number;

  @Prop({ type: [String], default: [] })
  comentarios: string[];

  @Prop({ default: 0 })
  ventas: number;

  @Prop({ default: 0 })
  totalValoraciones: number;

  @Prop({ default: 0 })
  cantidadValoraciones: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);