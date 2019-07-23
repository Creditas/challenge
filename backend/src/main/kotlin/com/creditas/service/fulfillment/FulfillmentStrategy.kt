package com.creditas.service.fulfillment

import com.creditas.model.Order

interface FulfillmentStrategy {

    fun fulfill(order: Order)

}
