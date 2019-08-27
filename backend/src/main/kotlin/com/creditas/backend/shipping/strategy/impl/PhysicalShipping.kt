package com.creditas.backend.shipping.strategy.impl

import com.creditas.backend.domain.Order
import com.creditas.backend.shipping.service.impl.ShippingLabel
import com.creditas.backend.shipping.strategy.Shipping

class PhysicalShipping(val shippingLabel: ShippingLabel) : Shipping {

    companion object {
        val LABEL_MESSAGE = "Physical Label"
    }

    override fun ship(order: Order) {
        shippingLabel.generate(order, LABEL_MESSAGE)
    }
}