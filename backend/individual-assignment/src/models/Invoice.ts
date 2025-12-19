import { Address } from './Address';
import { Order } from './Order';

export class Invoice {
    public billingAddress: Address;
    public shippingAddress: Address;

    constructor(public order: Order) {
        this.billingAddress = order.address;
        this.shippingAddress = order.address;
    }
}
