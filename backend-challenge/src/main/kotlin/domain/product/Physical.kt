package domain.product

import domain.payment.ProductType
import domain.payment.ProductType.*
import domain.shipment.PhysicalShipment
import domain.shipment.ShipmentStrategy
import domain.shipment.ShippingLabel

data class Physical(
        val name: String,
        val type: ProductType = PHYSICAL,
        override val price: Double,
        val shippingLabel: ShippingLabel? = null
) : Product() {

    override fun shipmentStrategy(): ShipmentStrategy = PhysicalShipment()
}