"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProcessor = void 0;
class OrderProcessor {
    constructor(shippingStrategy, paymentStrategy) {
        this.shippingStrategy = shippingStrategy;
        this.paymentStrategy = paymentStrategy;
    }
    processOrder(order) {
        this.paymentStrategy.processPayment(order);
        this.shippingStrategy.ship(order);
        order.close();
    }
}
exports.OrderProcessor = OrderProcessor;
