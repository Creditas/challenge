package com.creditas.service.fulfillment

import com.creditas.model.Order
import com.creditas.service.ShippingLabelService

class BookFulfillmentStrategy : FulfillmentStrategy {

    private val ADDITIONAL_INFO = "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."

    override fun fulfill(order: Order) {
        ShippingLabelService().generate(ADDITIONAL_INFO)
    }
}