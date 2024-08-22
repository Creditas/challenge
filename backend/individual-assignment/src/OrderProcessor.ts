import { Order } from './models/Order';
import { PaymentStrategy } from './interfaces/PaymentStrategy';
import { ShippingStrategy } from './interfaces/ShippingStrategy';

export class OrderProcessor {
    constructor(
        private shippingStrategy: ShippingStrategy,
        private paymentStrategy: PaymentStrategy
    ) {}

    processOrder(order: Order): void {
        this.paymentStrategy.processPayment(order);
        this.shippingStrategy.ship(order);
        order.close();
    }
}
