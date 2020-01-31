package com.creditas.backend.shipping.strategy.impl

import com.creditas.backend.domain.Order
import com.creditas.backend.shipping.service.impl.SendEmail
import com.creditas.backend.shipping.service.impl.GrantVoucher
import com.creditas.backend.shipping.strategy.Shipping
import java.math.BigDecimal

class DigitalShipping(val sendEmail: SendEmail, val grantVoucher: GrantVoucher) : Shipping {

    override fun ship(order: Order) {
        var productDescription : String = ""
        order.items.forEach { (item) ->
            run {
                productDescription = "${item.name} - R$ ${item.price}"
            }
        }
        sendEmail.send(order.customer.email, "Digital Shipping", productDescription)
        grantVoucher.generate(BigDecimal.TEN)
    }
}