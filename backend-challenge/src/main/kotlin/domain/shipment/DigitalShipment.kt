package domain.shipment

import domain.communication.EmailSender
import domain.product.Product
import domain.product.Product.Digital

class DigitalShipment(
        private val emailSender: EmailSender
) : Shipment {

    override fun shipping(product: Product) : Product{
        product as Digital
        emailSender.send("Your purchase description: ${product.toString()}")
        return product.copy(
                voucher = 10.0
        )
    }
}