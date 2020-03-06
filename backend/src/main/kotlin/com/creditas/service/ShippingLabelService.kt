package com.creditas.service

import com.creditas.model.Order

// This class is responsible to generate Shipping Label
class ShippingLabelService {

    fun generate(order: Order, additionalInfo : String = "") {
        println("Shipping Label generated! ${additionalInfo}")
    }
}