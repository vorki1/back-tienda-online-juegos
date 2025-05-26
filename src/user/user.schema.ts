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

  @Prop({ required: true, default: 'usuario' })
  rol: string;
}

export const UserSchema = SchemaFactory.createForClass(User);