import { Customer } from '../models/Customer';

export interface DiscountVoucherApplier {
    applyDiscountVoucher(customer: Customer): void;
}
