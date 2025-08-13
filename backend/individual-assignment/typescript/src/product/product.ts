import { Order } from "../order";

export enum ProductType {
  PHYSICAL = "PHYSICAL",
  BOOK = "BOOK",
  DIGITAL = "DIGITAL",
  MEMBERSHIP = "MEMBERSHIP",
}

export interface ProductProcessorAfterPurchase {
  process(order: Order): void;
}

export class Product {
  constructor(
    public name: string,
    public type: ProductType,
    public price: number,
  ) {}
}
