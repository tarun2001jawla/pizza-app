import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CartDto } from '../dto/create-cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req,  @Body() cartDto: CartDto) {
    console.log('Received cart data:', cartDto);
    console.log('user', req.user);
    return this.cartService.create({...cartDto, userId: req.user.userId});
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() cartDto: Partial<CartDto>) {
    return this.cartService.update(+id, cartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
