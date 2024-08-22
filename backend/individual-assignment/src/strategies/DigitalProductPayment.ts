import { PaymentStrategy } from '../interfaces/PaymentStrategy';
import { ReceiptSender } from '../interfaces/ReceiptSender';
import { DiscountVoucherApplier } from '../interfaces/DiscountVoucherApplier';
import { Order } from '../models/Order';
import { Payment } from '../models/Payment';
import { CreditCard } from '../models/CreditCard';

export class DigitalProductPayment implements PaymentStrategy {
    constructor(
        private receiptSender: ReceiptSender,
        private voucherApplier: DiscountVoucherApplier
    ) {}

    processPayment(order: Order): void {
        if (!order.payment) {
            order.payment = new Payment(order, new CreditCard("1234-5678-9012-3456"));
            console.log("Processing digital product payment...");
            this.receiptSender.sendReceipt(order.customer);
            this.voucherApplier.applyDiscountVoucher(order.customer);
        }
    }
}
