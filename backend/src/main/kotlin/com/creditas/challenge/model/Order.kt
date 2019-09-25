package com.creditas.challenge.model

import java.lang.IllegalArgumentException
import java.math.BigDecimal
import java.math.RoundingMode

interface Order {

    val account: Account
    val items: List<Item>
    val feesAndDiscounts: Map<String, BigDecimal>
    var paymentMethod: PaymentMethod?

    fun selectPaymentMethod(paymentMethod: PaymentMethod) = apply {
        this.paymentMethod = paymentMethod
    }

    fun place() = apply {  }

    fun pay() = apply {  }

    fun invoice() = apply {  }

    fun fulfillment() = apply {  }

    fun complete() = apply {  }

    fun subtotal(): BigDecimal {
        return items.asSequence()
            .map { item -> item.subtotal }
            .fold(BigDecimal.ZERO) { acc, value ->acc.plus(value) }
            .setScale(2, RoundingMode.HALF_UP)
    }

    fun grandTotal(): BigDecimal {
        return feesAndDiscounts.values.asSequence()
            .fold(BigDecimal.ZERO) { acc, value ->acc.plus(value) }
            .plus(subtotal())
            .setScale(2, RoundingMode.HALF_UP)
    }
}

class PhysicalOrder(override val items: List<Item>,
                    override val account: Account) : Order {

    override val feesAndDiscounts = HashMap<String, BigDecimal>()
    override var paymentMethod: PaymentMethod? = account.getDefaultPaymentMethod()

    lateinit var shippingAddress: Address

    fun shippingAddress(address: Address) = apply {
        this.shippingAddress = address
    }

    val parcels: () -> List<Parcel> = {
        items.asSequence()
            .groupBy { item -> item.product.type }
            .map { (type, items) ->
                when(type) {
                    ProductType.PHYSICAL -> Parcel(items, shippingAddress, ShippingLabel.DEFAULT)
                    ProductType.PHYSICAL_TAX_FREE -> Parcel(items, shippingAddress, ShippingLabel.TAX_FREE)
                    else -> throw IllegalArgumentException("No rules found to handle shipment for this Product Type")
                }
            }
    }

}

class DigitalOrder(override val items: List<Item>,
                   override val account: Account) : Order {

    override val feesAndDiscounts = HashMap<String, BigDecimal>()
    override var paymentMethod: PaymentMethod? = account.getDefaultPaymentMethod()

}

class MembershipOrder(override val items: List<Item>,
                      override val account: Account) : Order {

    constructor(item: Item, account: Account): this(listOf(item), account)

    override val feesAndDiscounts = HashMap<String, BigDecimal>()
    override var paymentMethod: PaymentMethod? = account.getDefaultPaymentMethod()

}
