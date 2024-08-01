import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IngredientService } from '../services/ingredient.service';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';
import { Ingredient } from '../models/ingredient.model';

@Controller('ingredients')
export class IngredientController {

  constructor(private readonly ingredientService: IngredientService) {}
  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto): Promise<Ingredient[]> {
    return this.ingredientService.Bulkcreate(createIngredientDto);
  }

  @Get()
  findAll(): Promise<Ingredient[]> {
    return this.ingredientService.findAll();
  }

  @Get(':category')
  findByCategory(@Param('category') category: string): Promise<Ingredient[]> {
    return this.ingredientService.findByCategory(category);
  }
}