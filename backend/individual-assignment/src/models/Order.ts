import { OrderItem } from './OrderItem';
import { Customer } from './Customer';
import { Address } from './Address';
import { Payment } from './Payment';
import { Product } from './Product';
import{PaymentStrategy} from '../interfaces/PaymentStrategy';

export class Order {
    public items: OrderItem[] = [];
    public closedAt: Date | null = null;
    public payment: Payment | null = null;

    constructor(public customer: Customer, public address: Address) {}

    get totalAmount(): number {
        return this.items.reduce((sum, item) => sum + item.total, 0);
    }

    addProduct(product: Product, quantity: number): void {
        const productAlreadyAdded = this.items.some(item => item.product === product);
        if (productAlreadyAdded) {
            throw new Error("The product has already been added. Change the amount if you want more.");
        }

        this.items.push(new OrderItem(product, quantity));
    }

    pay(strategy: PaymentStrategy): void {
        if (this.payment) {
            throw new Error("The order has already been paid!");
        }

        if (this.items.length === 0) {
            throw new Error("Empty order cannot be paid!");
        }

        strategy.processPayment(this);
        this.close();
    }

    public close(): void {
        this.closedAt = new Date();
    }
}
