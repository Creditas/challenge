package domain.shipment

import domain.product.Product

interface ShipmentStrategy {

    fun shipping(product: Product) : Product
}