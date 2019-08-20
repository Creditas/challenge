package main.kotlin.core.domain.product

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.shipping.DigitalShipping
import main.kotlin.core.domain.shipping.ShippingStrategy

data class Digital(val name: String,
                   override val price: Double) : Product() {
    override fun ship(customer: Customer): ShippingStrategy = DigitalShipping(customer)
}