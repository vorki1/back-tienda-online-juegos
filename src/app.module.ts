import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompraModule } from './compra/compra.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://username:username@tiendajuegos.btuxvkk.mongodb.net/'
      
    ),
    AuthModule,
    CompraModule,
    AdminModule,
    UserModule,
    ProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}