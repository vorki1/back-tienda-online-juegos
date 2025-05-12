import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, ProductsModule, AdminModule , UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
