import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Compra extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  userId?: string; // Puede ser null si no está logeado

  @Prop({ required: true })
  productos: [
    {
      productId: { type: Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true },
      valoracion: { type: Number, required: true },
      comentario: { type: String }
    }
  ];

  @Prop({ required: true, default: Date.now })
  fecha: Date;
}

export const CompraSchema = SchemaFactory.createForClass(Compra);