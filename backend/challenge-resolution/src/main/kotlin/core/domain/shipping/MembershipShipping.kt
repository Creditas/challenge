package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.notification.EmailSender
import main.kotlin.core.domain.product.Membership
import main.kotlin.core.domain.product.Product

class MembershipShipping(val customer: Customer) : ShippingStrategy{
    override fun ship(product: Product) = with(product as Membership) {
        EmailSender.sendShippingNotification(customer)
        product.copy(isActivated = true)
    }
}