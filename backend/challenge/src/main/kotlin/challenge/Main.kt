package com.baggiovictor.challenge.domain

import challenge.domain.entities.*
import challenge.domain.entities.ProductType.*

fun main() {
    val shirt = Product("Flowered t-shirt", PHYSICAL, 35.00)
    val netflix = Product("Familiar plan", MEMBERSHIP, 29.90)
    val book = Product("The Hitchhiker's Guide to the Galaxy", BOOK, 120.00)
    val music = Product("Stairway to Heaven", DIGITAL, 5.00)

    val order = Order(Customer(), Address())

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    order.pay(CreditCard("43567890-987654367"))
}