package main.kotlin.core.domain.product

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.shipping.BookShipping
import main.kotlin.core.domain.shipping.ShippingLabel
import main.kotlin.core.domain.shipping.ShippingStrategy

data class Book(val name: String,
                override val price: Double,
                val shippingLabel: ShippingLabel? = null) : Product() {
    override fun ship(customer: Customer): ShippingStrategy = BookShipping()
}