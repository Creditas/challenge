import { ShippingStrategy } from '../interfaces/ShippingStrategy';
import { Order } from '../models/Order';

export class NoShipping implements ShippingStrategy {
    ship(order: Order): void {
        console.log("No shipping required for this product type.");
    }
}
