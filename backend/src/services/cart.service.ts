import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from '../models/cart.model';
import { CartDto } from '../dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
  ) {}

  async create(cartDto: CartDto): Promise<Cart> {
    try {
      console.log('Creating cart with data:', cartDto);
      if (!cartDto.userId) {
        throw new Error('userId is required');
      }
      return await this.cartModel.create({
        ingredients: cartDto.ingredients,
        price: cartDto.price,
        quantity: cartDto.quantity,
        pizzaName: cartDto.pizzaName,
        userId: cartDto.userId
      });
    } catch (error) {
      console.error('Error creating cart:', error);
      throw new Error(`Failed to create cart: ${error.message}`);
    }
  }
  async findAll(): Promise<Cart[]> {
    return this.cartModel.findAll();
  }

  async findOne(id: number): Promise<Cart> {
    return this.cartModel.findByPk(id);
  }

  async update(id: number, cartDto: Partial<CartDto>): Promise<[number, Cart[]]> {
    return this.cartModel.update(cartDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.cartModel.destroy({
      where: { id },
    });
  }
}
