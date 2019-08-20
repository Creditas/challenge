package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.product.Product

object Shipment {
    fun shipProduct(product: Product, customer: Customer) = product.ship(customer).shipping(product)
}