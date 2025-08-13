import { Address } from "./address";
import { Customer } from "./customer";
import {
  Product,
  ProductType,
  BookProductProcessor,
  DigitalProductProcessor,
  PhysicalProductProcessor,
  MembershipProductProcessor,
  ProductProcessorAfterPurchase,
} from "./product";
import { Payment, PaymentMethod } from "./payment";
import { OrderItem } from "./orderItem";
import { EmailProviderService } from "./emailProviderService";

export class Order {
  public items: OrderItem[] = [];
  public closedAt: Date | null = null;
  public payment: Payment | null = null;
  public description: string | null = null;
  private processorsAfterPurchase: Map<
    ProductType,
    ProductProcessorAfterPurchase
  > = new Map();

  constructor(
    public customer: Customer,
    public address: Address,
  ) {
    this.processorsAfterPurchase.set(
      ProductType.PHYSICAL,
      new PhysicalProductProcessor(),
    );
    this.processorsAfterPurchase.set(
      ProductType.BOOK,
      new BookProductProcessor({}),
    );
    this.processorsAfterPurchase.set(
      ProductType.MEMBERSHIP,
      new MembershipProductProcessor(),
    );
    this.processorsAfterPurchase.set(
      ProductType.DIGITAL,
      new DigitalProductProcessor(new EmailProviderService()),
    );
  }

  public get totalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  public addProduct(product: Product, quantity: number): void {
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

  public pay(method: PaymentMethod): void {
    if (this.payment) {
      throw new Error("The order has already been paid!");
    }

    if (this.items.length === 0) {
      throw new Error("Empty order cannot be paid!");
    }

    this.payment = new Payment(this, method);
    this.close();
    this.processingActionsAfterPurchase();
  }

  private processingActionsAfterPurchase(): void {
    this.items.forEach((item) => {
      const productProcessor = this.processorsAfterPurchase.get(
        item.product.type,
      );
      if (productProcessor) productProcessor.process(this);
    });
  }

  public close(): void {
    this.closedAt = new Date();
  }
}
