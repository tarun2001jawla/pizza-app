import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredient } from '../models/ingredient.model';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
  ) {}

  async Bulkcreate(createIngredientDto: CreateIngredientDto): Promise<Ingredient[]> {
    return this.ingredientModel.bulkCreate(createIngredientDto as any);
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.findAll();
  }

  async findByCategory(category: string): Promise<Ingredient[]> {
    return this.ingredientModel.findAll({ where: { category } });
  }
}