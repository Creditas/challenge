package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.email.EmailSender
import main.kotlin.core.domain.product.Digital
import main.kotlin.core.domain.product.Product
import main.kotlin.core.domain.voucher.Voucher

class DigitalShipping(val customer: Customer) : ShippingStrategy{
    override fun ship(product: Product) = with(product as Digital) {
        EmailSender.sendShippingNotification(customer)
        product.copy(voucher = Voucher(10.0))
    }
}