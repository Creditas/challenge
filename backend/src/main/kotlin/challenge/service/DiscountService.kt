package challenge.service

import challenge.entity.DiscountVoucher
import challenge.entity.Order

class DiscountService private constructor() {
    companion object {
        fun instance() = DiscountService()
    }

    fun grantDiscount(order: Order, quantity: Int): DiscountVoucher {
        val discountVoucher = DiscountVoucher(order.customer, quantity)
        println("Saving discountVoucher: $discountVoucher")
        // save in DB

        // Return saved discountVoucher
        return discountVoucher
    }
}
