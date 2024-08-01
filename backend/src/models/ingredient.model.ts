import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Ingredient extends Model {
  @Column
  name: string;

  @Column
  category: string;

  @Column(DataType.FLOAT)
  price: number;

  @Column
  unit: string;

  @Column
  description: string;
}