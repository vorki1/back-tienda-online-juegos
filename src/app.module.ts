import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';



@Module({
  imports: [AuthModule, ProductsModule, AdminModule , UserModule, MongooseModule.forRoot(
      'mongodb+srv://username:username@taller5Bdnosql.mongodb.net/tiendajuegos?retryWrites=true&w=majority',
      {
        dbName: '<dbname>', // opcional si ya está en la URI
      },
    ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
