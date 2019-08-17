package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.product.Membership
import main.kotlin.core.domain.product.Product

class MembershipShipping : ShippingStrategy{
    override fun ship(product: Product) = with(product as Membership) {
        //SendEmailHere
        this.copy(isActivated = true)
    }
}