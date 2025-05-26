import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from './purchase.schema';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
  ) {}

  async createPurchase(userId: string, productId: string, cantidad: number) {
    const purchase = new this.purchaseModel({ userId, productId, cantidad, fecha: new Date() });
    return purchase.save();
  }

  async getUserPurchases(userId: string) {
    return this.purchaseModel
      .find({ userId })
      .populate('productId') // Esto trae los datos del producto
      .exec();
  }
}