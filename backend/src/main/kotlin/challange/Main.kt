package main.challenge

import main.challenge.domain.*

fun main(args: Array<String>) {
    val shoppingCart = seedShoppingCart()
    val customer = Customer("Pablo", "ruanmyv@gmail.com")
    val address = Address()

    val creditCard = CreditCard("43567890-987654367")
    processOrdersOfCustomer(customer, address, creditCard, shoppingCart)
}

fun processOrdersOfCustomer(
    customer: Customer,
    address: Address,
    creditCard: CreditCard,
    shoppingCart: MutableMap<Product, Int>
) {

    val order = Order(customer, address)

    shoppingCart.forEach { order.addProduct(it.key, it.value) }

    order.pay(creditCard)
}

fun seedShoppingCart(): MutableMap<Product, Int> {
    val items = mutableMapOf<Product, Int>()

    val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00)
    items.put(shirt, 2)

    val netflix =
        Product("Netflix Familiar plan", ProductType.MEMBERSHIP, 29.90)
    items.put(netflix, 1)

    val book = Product(
        "The Hitchhiker's Guide to the Galaxy",
        ProductType.BOOK,
        120.00
    )
    items.put(book, 1)

    val music = Product("Stairway to Heaven", ProductType.DIGITAL, 5.00)
    items.put(music, 1)

    return items
}
