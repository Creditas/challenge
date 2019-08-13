package domain.shipment

import domain.product.Product

object ShipmentContext {

    fun prepareProductToShipping(product: Product) = product.shipmentStrategy().shipping(product)
}