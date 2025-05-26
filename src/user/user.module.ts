import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { ProductsService } from '../products/products.service';
import { PurchasesModule } from '../purchases/purchases.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PurchasesModule, // Importa el módulo de compras
  ],
  controllers: [UserController],
  providers: [UserService, ProductsService],
  exports: [UserService],
})
export class UserModule {}