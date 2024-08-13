import { PaymentStrategy } from ".";
import OrderItem from "../services/order-item";

export default class BookPaymentStrategy implements PaymentStrategy {
  process(orderItem: OrderItem): void {
    console.log("Generating shipping label for book.");
    this.generateShippingLabel(orderItem);
  }

  private generateShippingLabel(orderItem: OrderItem): void {
    console.log(`Tax-Exempt Shipping Label for ${orderItem.product.name}`);
  }
}