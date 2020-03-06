package com.creditas.service

import com.creditas.model.Order
import com.creditas.service.fulfillment.FulfillmentStrategy

class FulfillmentService {

    fun fulfill(order: Order) {
        if (order.payment == null)
            throw Exception("The order has not been paid!")

        val items = order.items
        items.forEach { (item) -> run {
            val strategy = FulfillmentStrategy.newInstance(item.type)
            strategy.fulfill(order)
        }
        }
    }
}