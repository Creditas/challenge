package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.product.Physical
import main.kotlin.core.domain.product.Product

class PhysicalShipping(val labelName: String) : ShippingStrategy{
    override fun ship(product: Product) = with(product as Physical) {
        product.copy(shippingLabel = "For: $labelName")
    }
}