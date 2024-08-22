"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const Invoice_1 = require("./Invoice");
class Payment {
    constructor(order, paymentMethod) {
        this.order = order;
        this.paymentMethod = paymentMethod;
        this.paidAt = new Date();
        this.authorizationNumber = this.paidAt.getTime();
        this.amount = order.totalAmount;
        this.invoice = new Invoice_1.Invoice(order);
    }
}
exports.Payment = Payment;
