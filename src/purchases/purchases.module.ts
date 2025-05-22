import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchase, PurchaseSchema } from './purchase.schema';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Purchase.name, schema: PurchaseSchema }]),
  ],
  providers: [PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}