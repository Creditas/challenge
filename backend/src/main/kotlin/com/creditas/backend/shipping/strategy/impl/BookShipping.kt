package com.creditas.backend.shipping.strategy.impl

import com.creditas.backend.domain.Order
import com.creditas.backend.shipping.service.impl.ShippingLabel
import com.creditas.backend.shipping.strategy.Shipping

class BookShipping(val shippingLabel : ShippingLabel) : Shipping {

    override fun ship(order: Order) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}