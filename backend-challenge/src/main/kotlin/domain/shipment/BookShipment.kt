package domain.shipment

import domain.product.Product
import domain.product.Product.*

class BookShipment : Shipment {

    override fun shipping(product: Product): Product {
        product as Book
        return product.copy(
                shippingLabel = ShippingLabel(notification = "free from taxes")
        )
    }
}