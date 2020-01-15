package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.notification.EmailSender
import main.kotlin.core.domain.product.Digital
import main.kotlin.core.domain.product.Product
import main.kotlin.core.domain.voucher.Voucher

class DigitalShipping(val customer: Customer) : ShippingStrategy{
    override fun shipping(product: Product) = with(product as Digital) {
        EmailSender.sendShippingNotification(customer, this.name)
        customer.addVoucher(Voucher(10.0))
        this.copy()
    }
}