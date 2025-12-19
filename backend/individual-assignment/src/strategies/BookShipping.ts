import { ShippingStrategy } from '../interfaces/ShippingStrategy';
import { Order } from '../models/Order';

export class BookShipping implements ShippingStrategy {
    ship(order: Order): void {
        console.log("Generating shipping label for book with tax exemption notice...");
        // Implementação para gerar etiqueta de envio com aviso de isenção
    }
}
