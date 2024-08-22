"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
class Invoice {
    constructor(order) {
        this.order = order;
        this.billingAddress = order.address;
        this.shippingAddress = order.address;
    }
}
exports.Invoice = Invoice;
