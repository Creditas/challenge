package main.kotlin.core.domain.product

import main.kotlin.core.domain.shipping.MembershipShipping
import main.kotlin.core.domain.shipping.ShippingStrategy

data class Membership(override val name: String,
                 override val price: Double,
                 val isActivated: Boolean = false) : Product(name, price) {
    override fun ship(): ShippingStrategy = MembershipShipping()
}