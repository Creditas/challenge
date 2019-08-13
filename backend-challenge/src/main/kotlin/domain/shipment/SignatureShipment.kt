package domain.shipment

import domain.communication.EmailSender
import domain.product.Product
import domain.product.Signature

class SignatureShipment : ShipmentStrategy {

    override fun shipping(product: Product) = with(product as Signature) {
        EmailSender.send("Your signature for product: $product has been activated")
        product.activate()
    }
}