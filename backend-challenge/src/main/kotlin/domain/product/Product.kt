package domain.product

import domain.payment.ProductType
import domain.shipment.ShippingLabel

sealed class Product(
        open val price: Double
) {

    data class Physical(
            val name: String,
            val type: ProductType = ProductType.PHYSICAL,
            override val price: Double,
            val shippingLabel: ShippingLabel? = null
    ) : Product(price)

    data class Digital(
            val name: String,
            val type: ProductType = ProductType.DIGITAL,
            override val price: Double,
            val voucher: Double = 0.0
    ) : Product(price)

    data class Book(
            val name: String,
            val type: ProductType = ProductType.BOOK,
            override val price: Double,
            val shippingLabel: ShippingLabel? = null
    ) : Product(price)

    data class Signature(
            val name: String,
            val type: ProductType = ProductType.MEMBERSHIP,
            override val price: Double,
            val isActivated: Boolean = false
    ) : Product(price) {

        fun activate() = this.copy(isActivated = true)
    }
}


