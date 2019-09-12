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
        this.memberships.add(Membership(LocalDateTime.now(), product.name))
    }
}

