import { DiscountVoucherApplier } from '../interfaces/DiscountVoucherApplier';
import { Customer } from '../models/Customer';

export class DigitalDiscountVoucherApplier implements DiscountVoucherApplier {
    applyDiscountVoucher(customer: Customer): void {
        console.log("Applying discount voucher to user...");
        // Implementação para conceder o voucher de desconto
    }
}
