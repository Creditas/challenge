package challenge

import java.time.LocalDateTime


class Address

data class Discount(val value: Double)

data class Membership(val date: LocalDateTime, val name: String)

class Customer(val name: String, val email: String) {
    private var discount: Discount? = null

    private val memberships = mutableListOf<Membership>()

    val allMemberships
        get() = memberships

    fun addDiscount(discount: Discount) {
        this.discount = discount
    }

    fun addMembership(product: Product) {
        this.memberships.add(Membership(LocalDateTime.now(), product.name))
    }

}
