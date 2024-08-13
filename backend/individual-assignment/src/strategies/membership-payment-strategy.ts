import { PaymentStrategy } from ".";
import OrderItem from "../services/order-item";

export default class MembershipPaymentStrategy implements PaymentStrategy {
  process(orderItem: OrderItem): void {
    console.log("Activating membership");
    this.activateMembership(orderItem);
    console.log("Sending notification email.");
    this.sendEmail(orderItem);
  }

  private activateMembership(orderItem: OrderItem): void {
    console.log(`Membership for ${orderItem.product.name} activated.`);
  }

  private sendEmail(orderItem: OrderItem): void {
    console.log(`Email sent to user for membership activation.`);
  }
}