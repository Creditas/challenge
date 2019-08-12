package domain.shipment

import domain.communication.EmailSender
import domain.product.*
import domain.product.Product.*

class ShipmentContext {

    private val emailSender = EmailSender()

    fun prepareProductToShipping(product: Product) {
        val shipment = setStrategy(product)
        shipment.shipping(product)
    }

    private fun setStrategy(product: Product) : Shipment {
        return when (product) {
            is Book -> BookShipment()
            is Digital -> DigitalShipment(emailSender)
            is Signature -> SignatureShipment(emailSender)
            is Physical -> PhysicalShipment()
        }
    }
}