package com.creditas.service

// This class is responsible to generate Shipping Label
class ShippingLabelService {

    fun generate(additionalInfo : String = "") {
        println("Shipping Label generated! ${additionalInfo}")
    }
}