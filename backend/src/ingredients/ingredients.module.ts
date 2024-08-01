import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ingredient } from '../models/ingredient.model';
import { IngredientService } from '../services/ingredient.service';
import { IngredientController } from '../controllers/ingredient.controller';

@Module({
  imports: [SequelizeModule.forFeature([Ingredient])],
  providers: [IngredientService],
  controllers: [IngredientController],
})
export class IngredientsModule {}