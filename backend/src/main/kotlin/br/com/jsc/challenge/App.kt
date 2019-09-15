package br.com.jsc.challenge

import br.com.jsc.challenge.domain.*

fun main(args: Array<String>) {
    val shirt = Product(
        "Flowered t-shirt",
        ProductType.PHYSICAL,
        35.00
    )
    val netflix = Product(
        "Familiar plan",
        ProductType.MEMBERSHIP,
        29.90
    )
    val book = Product(
        "The Hitchhiker's Guide to the Galaxy",
        ProductType.BOOK,
        120.00
    )
    val music = Product(
        "Stairway to Heaven",
        ProductType.DIGITAL,
        5.00
    )

    val order = Order(
        Customer(),
        Address()
    )

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    order.pay(CreditCard("43567890-987654367"))

    val shipping = Shipping(order)
    shipping.process()
}