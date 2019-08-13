package domain.product

import domain.payment.ProductType
import domain.shipment.BookShipment
import domain.shipment.ShipmentStrategy
import domain.shipment.ShippingLabel

data class Book(
        val name: String,
        val type: ProductType,
        val price: Double,
        val shippingLabel: ShippingLabel? = null
) : Product() {
    override fun shipmentStrategy(): ShipmentStrategy = BookShipment()
}