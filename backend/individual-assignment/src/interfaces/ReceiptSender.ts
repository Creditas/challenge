import { Customer } from '../models/Customer';

export interface ReceiptSender {
    sendReceipt(customer: Customer): void;
}
