import { Order } from '../models/Order';

export interface PaymentStrategy {
    processPayment(order: Order): void;
}
