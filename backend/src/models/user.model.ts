import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Order } from './order.model';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Order)
  orders: Order[];
}