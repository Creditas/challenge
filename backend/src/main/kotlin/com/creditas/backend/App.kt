package com.creditas.backend

import com.creditas.backend.domain.CreditCard
import com.creditas.backend.domain.Order
import com.creditas.backend.domain.Product
import com.creditas.backend.domain.ProductType
import com.creditas.backend.domain.Customer
import com.creditas.backend.domain.Address
import com.creditas.backend.shipping.facade.ArrangeShipping

fun main(args : Array<String>) {
    val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00)
    val netflix = Product("Familiar plan", ProductType.MEMBERSHIP, 29.90)
    val book = Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00)
    val music = Product("Stairway to Heaven", ProductType.DIGITAL, 5.00)

    val order = Order(Customer("marcus.geekcode@gmail.com"), Address())

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    order.pay(CreditCard("43567890-987654367"))
    // now, how to deal with shipping rules then?
    ArrangeShipping().ship(order)
}