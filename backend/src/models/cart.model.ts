import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../models/user.model'; 
@Table
export class Cart extends Model<Cart> {

  
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  ingredients: object;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.STRING, // Added this block for pizzaName
    allowNull: false,
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pizzaName: string;
}
