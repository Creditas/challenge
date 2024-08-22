import { ShippingStrategy } from '../interfaces/ShippingStrategy';
import { Order } from '../models/Order';

export class MembershipActivationShipping implements ShippingStrategy {
    ship(order: Order): void {
        console.log("Activating membership and sending notification email...");
        // Implementação para ativar assinatura e enviar e-mail
    }
}
