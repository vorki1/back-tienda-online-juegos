import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  contrasenia: string;

  @Prop({ default: [] })
  compras: {
    productoId: string;
    cantidad: number;
    fecha: Date;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);