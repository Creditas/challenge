package main.kotlin.core.domain.product

import main.kotlin.core.domain.shipping.PhysicalShipping
import main.kotlin.core.domain.shipping.ShippingStrategy

data class Physical(override val name: String,
                    override val price: Double,
                    val customerName: String = "",
                    val shippingLabel: String? = null) : Product(name, price) {
    override fun ship(): ShippingStrategy = PhysicalShipping(customerName)
}