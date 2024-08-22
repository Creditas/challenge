import { PaymentMethod } from '../interfaces/PaymentMethod';

export class CreditCard implements PaymentMethod {
    constructor(public number: string) {}
}
