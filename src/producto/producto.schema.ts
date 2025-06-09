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

  @Prop({ default: 0 })
  cantidadVentas: number;

  @Prop({ default: 0 })
  promedioValoracion: number;

  @Prop({ default: 0 })
  cantidadValoraciones: number;

  @Prop({ type: [String], default: [] })
  comentarios: string[]; // solo los últimos N comentarios
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);