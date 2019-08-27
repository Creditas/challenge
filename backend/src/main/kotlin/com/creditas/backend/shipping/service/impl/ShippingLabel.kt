package com.creditas.backend.shipping.service.impl

import com.creditas.backend.domain.Order

class ShippingLabel {

    fun generate(order: Order, label: String) {
        println("Generating Shipping Label... ${label}")
    }

}