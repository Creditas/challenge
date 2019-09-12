package main.challenge.domain

import java.time.LocalDateTime

data class Address(val value: String)

data class Discount(val value: Double)

data class Membership(val date: LocalDateTime, val name: String)

class Customer(val name: String, val email: String) {
    private val memberships = mutableListOf<Membership>()

    val allMemberships
        get() = memberships

    fun addMembership(product: Product) {
        if (product.type != ProductType.MEMBERSHIP)
            throw Exception("Only membership products can create a new membership")

        this.memberships.add(Membership(LocalDateTime.now(), product.name))
    }
}

