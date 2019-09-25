package com.creditas.challenge.model

import java.lang.ClassCastException
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

    override fun equals(other: Any?): Boolean {
        return try {
            val that = other as Product
            (this.name == that.name) && (this.type == that.type)
        } catch (ex: ClassCastException) {
            false
        }
    }

    override fun hashCode(): Int {
        var result = name.hashCode()
        result = 31 * result + type.hashCode()
        return result
    }
}

enum class ProductType (val orderType: OrderType) {
    PHYSICAL (OrderType.PHYSICAL),
    PHYSICAL_TAX_FREE (OrderType.PHYSICAL),
    DIGITAL (OrderType.DIGITAL),
    SUBSCRIPTION (OrderType.MEMBERSHIP)
}
