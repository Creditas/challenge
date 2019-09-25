package com.creditas.challenge.model

import java.lang.IllegalArgumentException
import java.math.BigDecimal
import java.math.RoundingMode

interface Order {

    val account: Account
    val items: List<Item>
    val feesAndDiscounts: Map<String, BigDecimal>
    var paymentMethod: PaymentMethod

    fun selectPaymentMethod(paymentMethod: PaymentMethod) = apply {
        this.paymentMethod = paymentMethod
    }

    fun place() = apply {
        require(items.isNotEmpty()) { "There must be at least one item to place the Order" }
    }

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
    override lateinit var paymentMethod: PaymentMethod

    lateinit var shippingAddress: Address
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

    init {
        require(items.count {
            it.product.type != ProductType.PHYSICAL &&
            it.product.type != ProductType.PHYSICAL_TAX_FREE } == 0) {
            "A Physical Order may only contain Physical items"
        }
    }

    fun selectShippingAddress(address: Address) = apply {
        this.shippingAddress = address
    }

    override fun selectPaymentMethod(paymentMethod: PaymentMethod) = apply {
        super.selectPaymentMethod(paymentMethod)
    }

    override fun place() = apply {
        super.place()
        require(::shippingAddress.isInitialized) { "Shipping Address must be informed for Orders with physical delivery" }
        require(::paymentMethod.isInitialized) { "A Payment method must be informed to place the Order" }

        val shippingCosts = parcels()
            .map { it.getShippingCosts() }
            .fold(BigDecimal.ZERO) { acc, value ->acc.plus(value) }

        feesAndDiscounts["shippingCosts"] = shippingCosts
    }

    override fun pay() = apply {
        super.pay()
    }

    override fun invoice() = apply {
        super.invoice()
    }

    override fun fulfillment() = apply {
        super.fulfillment()
    }

    override fun complete() = apply {
        super.complete()
    }
}

class DigitalOrder(override val items: List<Item>,
                   override val account: Account) : Order {

    override val feesAndDiscounts = HashMap<String, BigDecimal>()
    override lateinit var paymentMethod: PaymentMethod

    init {
        require(items.count { it.product.type != ProductType.DIGITAL } == 0) {
            "A Digital Order may only contain Digital items"
        }
    }

    override fun place() = apply {
        super.place()
        require(::paymentMethod.isInitialized) { "A Payment method must be informed to place the Order" }

        this.feesAndDiscounts["Voucher"] = BigDecimal("-10")
    }

}

class MembershipOrder(override val items: List<Item>,
                      override val account: Account) : Order {

    constructor(item: Item, account: Account): this(listOf(item), account)

    override val feesAndDiscounts = HashMap<String, BigDecimal>()
    override lateinit var paymentMethod: PaymentMethod

    init {
        require(items.count { it.product.type != ProductType.SUBSCRIPTION } == 0) {
            "A Membership Order may only contain Membership items"
        }
        require(items.count() == 1) {
            "A Membership Order may only contain one Membership subscription"
        }
    }

    override fun place() = apply {
        super.place()
        require(::paymentMethod.isInitialized) { "A Payment method must be informed to place the Order" }
    }
}
