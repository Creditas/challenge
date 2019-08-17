package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.product.Digital
import main.kotlin.core.domain.product.Product
import main.kotlin.core.domain.voucher.Voucher

class DigitalShipping : ShippingStrategy{
    override fun ship(product: Product) = with(product as Digital) {
        //SendEmailHere
        this.copy(voucher = Voucher(10.0))
    }
}