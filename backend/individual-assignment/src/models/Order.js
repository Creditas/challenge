"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const OrderItem_1 = require("./OrderItem");
class Order {
    constructor(customer, address) {
        this.customer = customer;
        this.address = address;
        this.items = [];
        this.closedAt = null;
        this.payment = null;
    }
    get totalAmount() {
        return this.items.reduce((sum, item) => sum + item.total, 0);
    }
    addProduct(product, quantity) {
        const productAlreadyAdded = this.items.some(item => item.product === product);
        if (productAlreadyAdded) {
            throw new Error("The product has already been added. Change the amount if you want more.");
        }
        this.items.push(new OrderItem_1.OrderItem(product, quantity));
    }
    close() {
        this.closedAt = new Date();
    }
}
exports.Order = Order;
