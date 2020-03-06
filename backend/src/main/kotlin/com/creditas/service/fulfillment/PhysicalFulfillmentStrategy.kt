package com.creditas.service.fulfillment

import com.creditas.model.Order
import com.creditas.service.ShippingLabelService

class PhysicalFulfillmentStrategy(private val shippingLabelService : ShippingLabelService) : FulfillmentStrategy {

    override fun fulfill(order: Order) {
        println("Fulfill an Physical Item")
        shippingLabelService.generate(order)
        println("Physical Item fulfilled")
    }

}