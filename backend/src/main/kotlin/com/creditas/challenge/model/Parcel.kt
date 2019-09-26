package com.creditas.challenge.model

import com.creditas.challenge.model.ProductType.*
import java.lang.IllegalStateException
import java.math.BigDecimal
import java.math.RoundingMode

data class Parcel(val items: List<Item>,
                  val shippingAddress: Address,
                  val shippingLabel: ShippingLabel) {

    companion object {

        fun breakdown(items: List<Item>, shippingAddress: Address): List<Parcel> {
            return items.asSequence()
                .groupBy { it.product.type }
                .map { (productType, items) ->
                    when(productType) {
                        PHYSICAL -> Parcel(items, shippingAddress, ShippingLabel.DEFAULT)
                        PHYSICAL_TAX_FREE -> Parcel(items, shippingAddress, ShippingLabel.TAX_FREE)
                        else -> throw IllegalStateException("Unmapped ProductType, no corresponding Shipping Label")
                    }
                }
        }

        fun shippingCostsOf(parcels: List<Parcel>): BigDecimal {
            return parcels.map { it.shippingAndHandlingCosts() }
                .fold(BigDecimal.ZERO) { acc, value -> acc.plus(value) }
                .setScale(2, RoundingMode.HALF_UP)
        }

        fun importationFeesOf(parcels: List<Parcel>): BigDecimal {
            return parcels.map { it.importationTaxesAndFees() }
                .fold(BigDecimal.ZERO) { acc, value -> acc.plus(value) }
                .setScale(2, RoundingMode.HALF_UP)
        }
    }

    fun shippingAndHandlingCosts(): BigDecimal {
        //TODO("compute logistics costs based on size, weight and shippingAddress")
        return BigDecimal.TEN
    }

    fun importationTaxesAndFees(): BigDecimal {
        //TODO("compute taxes for importation in the destination country")
        return BigDecimal.ZERO
    }

}

enum class ShippingLabel(val description: String = "") {
    DEFAULT,
    TAX_FREE("Isento de impostos conforme disposto na Constituição Art. 150, VI, d.")
}