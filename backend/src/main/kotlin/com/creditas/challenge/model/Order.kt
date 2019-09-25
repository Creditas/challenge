package com.creditas.challenge.model

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

    fun place()

    fun pay()

    fun invoice()

    fun fulfillment()

    fun complete()

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

    override fun place() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun pay() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun invoice() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun fulfillment() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun complete() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}

class DigitalOrder(override val items: List<Item>,
                   override val account: Account) : Order {

    override val feesAndDiscounts = HashMap<String, BigDecimal>()
    override var paymentMethod: PaymentMethod? = account.getDefaultPaymentMethod()

    override fun place() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun pay() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun invoice() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun fulfillment() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun complete() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}

class MembershipOrder(override val items: List<Item>,
                      override val account: Account) : Order {

    constructor(item: Item, account: Account): this(listOf(item), account)

    override val feesAndDiscounts = HashMap<String, BigDecimal>()
    override var paymentMethod: PaymentMethod? = account.getDefaultPaymentMethod()

    override fun place() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun pay() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun invoice() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun fulfillment() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun complete() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}
