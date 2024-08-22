import { ReceiptSender } from '../interfaces/ReceiptSender';
import { Customer } from '../models/Customer';

export class DigitalReceiptSender implements ReceiptSender {
    sendReceipt(customer: Customer): void {
        console.log("Sending email receipt to user...");
        // Implementação para enviar e-mail
    }
}
