

import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Order extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address: string;

  @Column({
    type: DataType.JSON,
    allowNull: false
  })
  items: any; 

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  totalPrice: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'pending'
  })
  status: string;
}
