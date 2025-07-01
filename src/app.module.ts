import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompraModule } from './compra/compra.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProductoModule } from './producto/producto.module';
import { ConfigModule } from '@nestjs/config';
import { CarroModule } from './carro/carro.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://username:username@tiendajuegos.btuxvkk.mongodb.net/'
    ),
    ConfigModule.forRoot({
      isGlobal: true, // Hacer la configuración global para que esté disponible en toda la aplicación
      envFilePath: '.env', // Ruta al archivo .env
    }),
    AuthModule,
    CompraModule,
    AdminModule,
    UserModule,
    ProductoModule,
    CarroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}