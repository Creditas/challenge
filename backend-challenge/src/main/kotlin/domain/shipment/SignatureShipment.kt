package domain.shipment

import domain.communication.EmailSender
import domain.product.Product
import domain.product.Product.*

class SignatureShipment(
        private val emailSender: EmailSender
) : Shipment {

    override fun shipping(product: Product) : Signature {
        product as Signature
        emailSender.send("Your signature for product: $product has been activated")
        return product.activate()
    }
}