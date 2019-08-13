package domain.shipment

import domain.product.Book
import domain.product.Product

class BookShipment : ShipmentStrategy {

    override fun shipping(product: Product) = with(product as Book) {
        this.copy(
                shippingLabel = ShippingLabel(notification = "free from taxes")
        )
    }
}