import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProductoModule } from '../producto/producto.module';

@Module({
  imports: [ProductoModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}