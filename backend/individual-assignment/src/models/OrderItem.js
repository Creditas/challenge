"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
class OrderItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    get total() {
        return this.product.price * this.quantity;
    }
}
exports.OrderItem = OrderItem;
