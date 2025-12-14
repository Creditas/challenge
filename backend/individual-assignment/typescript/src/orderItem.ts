import { Product } from "./product/product";

export class OrderItem {
  constructor(
    public product: Product,
    public quantity: number,
  ) {}

  public get total(): number {
    return this.product.price * this.quantity;
  }
}
