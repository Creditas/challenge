package com.creditas.backend.shipping.strategy.impl

import com.creditas.backend.domain.Order
import com.creditas.backend.shipping.service.impl.ShippingLabel
import com.creditas.backend.shipping.strategy.Shipping

class BookShipping(val shippingLabel : ShippingLabel) : Shipping {

    companion object {
        val LABEL_MESSAGE = "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d"
    }

    override fun ship(order: Order) {
        shippingLabel.generate(order, LABEL_MESSAGE)
    }

}