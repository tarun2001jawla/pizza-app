import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from '../controllers/cart.controller';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart.model';

@Module({
  imports: [SequelizeModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}