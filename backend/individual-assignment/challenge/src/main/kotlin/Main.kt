package org.example

import org.example.dtos.Address
import org.example.dtos.CreditCard
import org.example.dtos.Customer
import org.example.dtos.Product
import org.example.enums.ProductType
import org.example.models.impl.Order

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
fun main(args : Array<String>) {
    val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00)
    val netflix = Product("Familiar plan", ProductType.MEMBERSHIP, 29.90)
    val book = Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00)
    val music = Product("Stairway to Heaven", ProductType.DIGITAL, 5.00)

    val order = Order(
        Customer(
            isMember = false,
            email = "batatoncio.solanum-tuberosum@wilsomclaudio.com"
        ),
        Address(
            street = "Here"
        )
    )

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    // In this scenario, we may use database instructions so that if the processProduct fail, the payment will rollback
    order.pay(CreditCard("43567890-987654367"))

    // Depending on how long does it take to some of these methods to be run, queue processors may be handy
    // The carefulness needed is if process method throws something, so that a payment rollback will be needed
    order.processProduct()
}