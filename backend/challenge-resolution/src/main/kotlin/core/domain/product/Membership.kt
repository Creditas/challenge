package main.kotlin.core.domain.product

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.shipping.MembershipShipping
import main.kotlin.core.domain.shipping.ShippingStrategy

data class Membership(val name: String,
                      override val price: Double,
                      val isActivated: Boolean = false) : Product() {
    override fun ship(customer: Customer): ShippingStrategy = MembershipShipping(customer)
}