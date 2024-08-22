"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalProductPayment = void 0;
const Payment_1 = require("../models/Payment");
const CreditCard_1 = require("../models/CreditCard");
class DigitalProductPayment {
    constructor(receiptSender, voucherApplier) {
        this.receiptSender = receiptSender;
        this.voucherApplier = voucherApplier;
    }
    processPayment(order) {
        if (!order.payment) {
            order.payment = new Payment_1.Payment(order, new CreditCard_1.CreditCard("1234-5678-9012-3456"));
            console.log("Processing digital product payment...");
            this.receiptSender.sendReceipt(order.customer);
            this.voucherApplier.applyDiscountVoucher(order.customer);
        }
    }
}
exports.DigitalProductPayment = DigitalProductPayment;
