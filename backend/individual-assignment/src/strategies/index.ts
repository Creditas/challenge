import OrderItem from "../services/order-item";

export interface PaymentStrategy {
  process(orderItem: OrderItem): void;
}
