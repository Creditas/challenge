import { ShippingStrategy } from '../interfaces/ShippingStrategy';
import { Order } from '../models/Order';

export class PhysicalProductShipping implements ShippingStrategy {
    ship(order: Order): void {
        console.log("Generating shipping label for physical product...");
        // Implementação para gerar etiqueta de envio
    }
}
