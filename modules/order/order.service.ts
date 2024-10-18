import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './order.schema';
import { OrderResponse } from './order-response.model';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<OrderDocument>) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const newOrder = new this.orderModel(createOrderDto);
    await newOrder.save();
    return newOrder;
  }

  async getAllOrders(): Promise<OrderResponse[]> {
    const orders = await this.orderModel.find().exec();
    return orders.map(order => this.mapToOrderResponse(order));
  }

  // Helper function to map OrderDocument to OrderResponse
  private mapToOrderResponse(order: OrderDocument): OrderResponse {
    return {
      id: order._id.toString(),
      name: order.name,
      email: order.email,
      company: order.company || '',
      material: order.material,
      fileUrl: order.fileUrl,
      cardType: order.cardType || '',
      cardNumber: order.cardNumber || '',
      purchaseOrder: order.purchaseOrder || null,
      createdAt: order.createdAt
    };
  }
}
