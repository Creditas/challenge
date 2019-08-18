package main.kotlin.core.domain.product

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.shipping.BookShipping
import main.kotlin.core.domain.shipping.ShippingStrategy

data class Book(override val name: String,
                override val price: Double,
                val shippingLabel: String? = null) : Product(name, price) {
    override fun ship(customer: Customer): ShippingStrategy = BookShipping()
}