package domain.shipment

import domain.product.Physical
import domain.product.Product

class PhysicalShipment : ShipmentStrategy {

    override fun shipping(product: Product) = with(product as Physical) {
        this.copy(shippingLabel = ShippingLabel(null))
    }
}