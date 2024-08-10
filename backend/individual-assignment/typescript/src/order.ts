import { Address } from "./address";
import { Customer } from "./customer";
import { Product } from "./product";
import { CreditCard, Payment } from "./payment";
import { OrderItem } from "./orderItem";

export class Order {
  public items: OrderItem[] = [];
  public closedAt: Date | null = null;
  public payment: Payment | null = null;

  constructor(
    public customer: Customer,
    public address: Address,
  ) {}

  get totalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  addProduct(product: Product, quantity: number): void {
    const productAlreadyAdded = this.items.some(
      (item) => item.product === product,
    );
    if (productAlreadyAdded) {
      throw new Error(
        "The product has already been added. Change the amount if you want more.",
      );
    }

    this.items.push(new OrderItem(product, quantity));
  }

  pay(method: PaymentMethodData | CreditCard): void {
    if (this.payment) {
      throw new Error("The order has already been paid!");
    }

    if (this.items.length === 0) {
      throw new Error("Empty order cannot be paid!");
    }

    this.payment = new Payment(this, method);
    this.close();
  }

  public close(): void {
    this.closedAt = new Date();
  }
}
