package main.kotlin.core.domain.product

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.shipping.ShippingStrategy

abstract class Product {
    abstract val price: Double
    abstract fun ship(customer: Customer) : ShippingStrategy
}