import { Product } from './Product';

export class OrderItem {
    constructor(public product: Product, public quantity: number) {}

    get total(): number {
        return this.product.price * this.quantity;
    }
}
