import { PaymentStrategy } from ".";
import OrderItem from "../services/order-item";

export default class PhysicalProductPaymentStrategy implements PaymentStrategy {
  process(orderItem: OrderItem): void {
    console.log("Generating shipping label for physical product.");
    this.generateShippingLabel(orderItem);
  }

  private generateShippingLabel(orderItem: OrderItem): void {
    console.log(`Shipping Label for ${orderItem.product.name}`);
  }
}