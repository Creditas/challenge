package com.creditas.challenge.model

import java.math.BigDecimal
import java.math.RoundingMode

data class Product(val name: String, val type: ProductType, private val _price: Double) {

    init {
        require(name.isNotBlank()) { "Product name cannot be blank" }
        require(_price > 0.0) { "Produce price must be > 0" }
    }

    val price: BigDecimal = _price
        .toBigDecimal()
        .setScale(2, RoundingMode.HALF_UP)
}

enum class ProductType {
    PHYSICAL,
    PHYSICAL_TAX_FREE,
    DIGITAL,
    SUBSCRIPTION
}
