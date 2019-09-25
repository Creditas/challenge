package com.creditas.challenge.model

import java.lang.IllegalArgumentException
import java.math.BigDecimal
import java.math.RoundingMode

interface Order {

    val account: Account
    val items: List<Item>

    val feesAndDiscounts: Map<String, BigDecimal>
    var paymentMethod: PaymentMethod
    var status: OrderStatus

    fun selectPaymentMethod(paymentMethod: PaymentMethod) = apply {
        this.paymentMethod = paymentMethod
    }

    fun place() = apply {
        require(items.isNotEmpty()) { "There must be at least one item to place the Order" }
    }

    fun pay() = apply {
        check((status.code < OrderStatus.PENDING.code).not()) { "Order must be placed before it can be payed" }
        check((status.code >= OrderStatus.NOT_SHIPPED.code).not()) { "Order Payment has been processed already" }
    }

    fun invoice() = apply {
        check((status.code < OrderStatus.NOT_SHIPPED.code).not()) { "Invoice can only be generated after payment is complete"}
    }

    fun fulfill() = apply{
        check((status.code < OrderStatus.NOT_SHIPPED.code).not()) { "Order must be placed and payed before it can be fulfilled" }
        check((status.code >= OrderStatus.SHIPPED.code).not()) { "Order Fulfillment has been processed already" }
    }

    fun complete() = apply {
        check((status.code < OrderStatus.SHIPPED.code).not()) { "Order must have been shipped/sent and confirmed, before it can be completed" }
        check((status.code >= OrderStatus.DELIVERED.code).not()) { "Order has been delivered already" }
    }

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
    override var status: OrderStatus = OrderStatus.UNKNOWN

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

        this.feesAndDiscounts["shippingCosts"] = shippingCosts
        this.status = OrderStatus.PENDING
    }

    override fun pay() = apply {
        super.pay()
        //TODO("Process Payment")
        this.status = OrderStatus.NOT_SHIPPED
    }

    override fun fulfill() = apply {
        super.fulfill()
        // TODO: Notify Buyer via email
        // TODO: Notify Seller about the Order to initiate the Processing & Shipping
        this.status = OrderStatus.SHIPPED
    }

    override fun complete() = apply {
        super.complete()
        // TODO: Track the Packages until all packages are delivered
        this.status = OrderStatus.DELIVERED
    }
}

class DigitalOrder(override val items: List<Item>,
                   override val account: Account) : Order {

    override val feesAndDiscounts = HashMap<String, BigDecimal>()
    override lateinit var paymentMethod: PaymentMethod
    override var status: OrderStatus = OrderStatus.UNKNOWN

    init {
        require(items.count { it.product.type != ProductType.DIGITAL } == 0) {
            "A Digital Order may only contain Digital items"
        }
    }

    override fun place() = apply {
        super.place()
        require(::paymentMethod.isInitialized) { "A Payment method must be informed to place the Order" }
        this.feesAndDiscounts["Voucher"] = BigDecimal("-10")
        this.status = OrderStatus.PENDING

    }

    override fun pay() = apply {
        super.pay()
        this.status = OrderStatus.UNSENT

    }

    override fun fulfill() = apply {
        super.fulfill()
        // TODO: Notify Buyer via email
        // TODO: Prepare Download Link and send it to the buyer
        this.status = OrderStatus.SENT
    }

    override fun complete() = apply {
        // TODO:: Track when the the Buyer clicks on the emailed link to redeem the item
        super.complete()
        this.status = OrderStatus.REDEEMED
    }
}

class MembershipOrder(override val items: List<Item>,
                      override val account: Account) : Order {

    constructor(item: Item, account: Account): this(listOf(item), account)

    override val feesAndDiscounts = HashMap<String, BigDecimal>()
    override lateinit var paymentMethod: PaymentMethod
    override var status: OrderStatus = OrderStatus.UNKNOWN

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

    override fun pay() = apply {
        super.pay()
    }

    override fun invoice() = apply {
        super.invoice()
    }

    override fun fulfill() = apply {
        super.fulfill()
    }

    override fun complete() = apply {
        super.complete()
    }
}

enum class OrderStatus(val code: Int = 0) {
    UNKNOWN,
    PENDING(100),
    NOT_SHIPPED(200),
    UNSENT(200),
    PENDING_ACTIVATION(200),
    SHIPPED(300),
    SENT(300),
    DELIVERED(400),
    REDEEMED(400),
    ACTIVATED(400)
}
