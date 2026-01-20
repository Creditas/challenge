import Product from "./product";
import { ERROR_MESSAGES } from "./utils";

export default class OrderItem {
  constructor(public product: Product, public quantity: number) { }

  get total(): number {
    return this.product.price * this.quantity;
  }

  public addQuantity(amount: number): void {
    if (amount <= 0) {
      throw new Error(ERROR_MESSAGES.QUANTITY_GREATER_THAN_ZERO);
    }
    this.quantity += amount;
  }
}