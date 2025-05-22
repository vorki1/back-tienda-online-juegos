import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Purchase extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: string;

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true, default: Date.now })
  fecha: Date;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);