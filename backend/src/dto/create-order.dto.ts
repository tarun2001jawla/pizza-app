// dto/create-order.dto.ts
export class CreateOrderDto {
  readonly userId: number;
  readonly name: string;
  readonly phone: string;
  readonly address: string;
  readonly items: any;
  readonly totalPrice: number;
  readonly status: string;
}
