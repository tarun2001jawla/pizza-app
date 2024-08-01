import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "src/models/order.model";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order
  ) {}

  async createOrder(orderData: any): Promise<Order> {
    console.log('Creating order with data:', orderData);
    return this.orderModel.create({
      ...orderData,
      items: JSON.stringify(orderData.items)  
    });
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    console.log(`Fetching orders for user ID: ${userId}`);
    if (!userId) {
      throw new NotFoundException('User ID is required');
    }
    return this.orderModel.findAll({
      where: {
        userId: userId
      }
    });
  }
}