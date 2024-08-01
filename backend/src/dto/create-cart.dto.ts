export class CartDto {
  readonly id: number;
  readonly ingredients: {
    Sauce: string;
    Base: string;
    Veggies: string;
    Meat: string;
    Cheese: string;
  };
  readonly price: number;
  readonly quantity: number;
  readonly pizzaName: string;
  
  readonly userId: number; 
}