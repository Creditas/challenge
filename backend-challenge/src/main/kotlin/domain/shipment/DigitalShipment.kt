package domain.shipment

import domain.communication.EmailSender
import domain.product.Digital
import domain.product.Product

class DigitalShipment : ShipmentStrategy {

    override fun shipping(product: Product) = with(product as Digital) {
        EmailSender.send("Your purchase description: ${product.name}")
        this.copy(voucher = 10.0)
    }
}