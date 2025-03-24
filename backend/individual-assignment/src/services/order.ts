import Address from "./address";
import Customer from "./customer";
import PaymentMethod from "../models/PaymentMethod";
import OrderItem from "./order-item";
import Payment from "./payment";
import Product, { ProductType } from "./product";
import { PaymentStrategy } from "../strategies";
import BookPaymentStrategy from "../strategies/book-payment.strategy";
import DigitalProductPaymentStrategy from "../strategies/digital-product-payment.strategy";
import MembershipPaymentStrategy from "../strategies/membership-payment-strategy";
import PhysicalProductPaymentStrategy from "../strategies/physical-product-payment.strategy";
import { ERROR_MESSAGES } from "./utils";



export default class Order {
  public items: OrderItem[] = [];
  public closedAt: Date | null = null;
  public payment: Payment | null = null;
  private paymentStrategyMap: Map<ProductType, PaymentStrategy>

  constructor(public customer: Customer, public address: Address) {
    this.paymentStrategyMap = new Map<ProductType, PaymentStrategy>([
      [ProductType.BOOK, new BookPaymentStrategy()],
      [ProductType.DIGITAL, new DigitalProductPaymentStrategy()],
      [ProductType.MEMBERSHIP, new MembershipPaymentStrategy()],
      [ProductType.PHYSICAL, new PhysicalProductPaymentStrategy()],
    ]);
  }

  get totalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  addProduct(product: Product, quantity: number): void {
    if (quantity <= 0) {
      throw new Error(ERROR_MESSAGES.QUANTITY_GREATER_THAN_ZERO);
    }
    const existingItem = this.items.find(item => item.product === product);
    if (existingItem) {
      existingItem.addQuantity(quantity);
    } else {
      this.items.push(new OrderItem(product, quantity));
    }
  }

  pay(method: PaymentMethod): void {
    if (this.payment) {
      throw new Error(ERROR_MESSAGES.ORDER_ALREADY_PAID);
    }

    if (this.items.length === 0) {
      throw new Error(ERROR_MESSAGES.EMPTY_ORDER);
    }

    this.payment = new Payment(this, method);
    this.processPayment()
    this.close();
  }

  public close(): void {
    this.closedAt = new Date();
  }

  public processPayment(): void {
    this.items.forEach((item) => {
      const paymentStrategy = this.paymentStrategyMap.get(
        item.product.type,
      );
      if (!paymentStrategy) {
        throw new Error(ERROR_MESSAGES.NO_PAYMENT_STRATEGY);
      };
      paymentStrategy.process(item)
    });
  }
}