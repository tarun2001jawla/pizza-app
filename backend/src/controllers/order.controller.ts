import { Controller, Get, Post, UseGuards, Request, Body, UnauthorizedException } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    console.log('Request user:', req.user);
  console.log('Request headers:', req.headers);
    const userId = req.user.userId;
    const orderData = {
      ...createOrderDto,
      userId,
      items: typeof createOrderDto.items === 'string' 
        ? JSON.parse(createOrderDto.items) 
        : createOrderDto.items
    };
    const order = await this.orderService.createOrder(orderData);
    return { message: 'Order created successfully', orderId: order.id };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@Request() req) {
    console.log('req.user:', req.user);
    const userId = req.user.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in token');
    }
    const orders = await this.orderService.getUserOrders(userId);
    return { orders };
  }
}