import { Order } from '../models/Order';

export interface ShippingStrategy {
    ship(order: Order): void;
}
