package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.product.Physical
import main.kotlin.core.domain.product.Product

class PhysicalShipping(val customer: Customer) : ShippingStrategy{
    override fun shipping(product: Product) = with(product as Physical) {
        this.copy(shippingLabel = ShippingLabel("For: ${customer.name}"))
    }
}