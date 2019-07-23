package com.creditas.service.fulfillment

import com.creditas.model.Order
import com.creditas.service.ShippingLabelService

class PhysicalFulfillmentStrategy : FulfillmentStrategy {

    override fun fulfill(order: Order) {
        println("Fulfill an Physical Item")
        ShippingLabelService().generate()
        println("Physical Item fulfilled")
    }

}