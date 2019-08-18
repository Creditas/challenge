package main.kotlin.core.domain.product

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.shipping.DigitalShipping
import main.kotlin.core.domain.shipping.ShippingStrategy
import main.kotlin.core.domain.voucher.Voucher

data class Digital(override val name: String,
                   override val price: Double,
                   val voucher: Voucher? = null) : Product(name, price) {
    override fun ship(customer: Customer): ShippingStrategy = DigitalShipping(customer)
}