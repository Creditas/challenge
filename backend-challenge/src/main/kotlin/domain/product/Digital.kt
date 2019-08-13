package domain.product

import domain.payment.ProductType
import domain.shipment.DigitalShipment
import domain.shipment.ShipmentStrategy

data class Digital(
        val name: String,
        val type: ProductType = ProductType.DIGITAL,
        override val price: Double,
        val voucher: Double = 0.0
) : Product() {

    override fun shipmentStrategy(): ShipmentStrategy = DigitalShipment()
}