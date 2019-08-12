package domain.shipment

import domain.product.Product

interface Shipment {

    fun shipping(product: Product) : Product
}