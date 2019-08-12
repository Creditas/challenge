package domain.shipment

import domain.product.Product
import domain.product.Product.*

class PhysicalShipment : Shipment {

    override fun shipping(product: Product) : Product {
        product as Physical
        return product.copy(
                shippingLabel = ShippingLabel(null)
        )
    }
}