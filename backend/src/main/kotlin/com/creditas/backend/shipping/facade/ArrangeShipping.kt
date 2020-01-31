package com.creditas.backend.shipping.facade

import com.creditas.backend.domain.Order
import com.creditas.backend.shipping.strategy.Shipping
import java.lang.IllegalArgumentException
import java.util.*

class ArrangeShipping {

    fun ship(order: Order) {
        if (order.payment == null) throw IllegalArgumentException("Order is not paid")

        order.items.forEach { (item) ->
            run {
                val shipping = Shipping.new(item.type)
                shipping.ship(order)
            }
        }
    }
}