package domain.shipment

import domain.product.Book
import domain.product.Product

class BookShipment : ShipmentStrategy {

    override fun shipping(product: Product): Product {
        product as Book
        return product.copy(
                shippingLabel = ShippingLabel(notification = "free from taxes")
        )
    }
}