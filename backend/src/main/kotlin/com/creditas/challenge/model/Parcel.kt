package com.creditas.challenge.model

import java.math.BigDecimal

data class Parcel(val items: List<Item>,
                  val shippingAddress: Address,
                  val shippingLabel: ShippingLabel) {

    fun getShippingCosts(): BigDecimal {
        //TODO("compute logistics costs based on size, weight and shippingAddress")
        return BigDecimal.TEN
    }

}

enum class ShippingLabel(val desc: String = "") {
    TAX_FREE("Isento de impostos conforme disposto na Constituição Art. 150, VI, d."),
    DEFAULT
}