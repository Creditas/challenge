package challenge

import challenge.infrastructure.repositories.business.*
import challenge.infrastructure.repositories.business.products.Book
import challenge.infrastructure.repositories.business.products.Digital
import challenge.infrastructure.repositories.business.products.Membership
import challenge.infrastructure.repositories.business.products.Physical
import challenge.services.DigitalService
import challenge.services.MembershipService
import challenge.services.OrderService
import challenge.services.ShippingService

fun main(args : Array<String>) {
    val shirt = Physical("Flowered t-shirt", 35.00)
    val netflix = Membership("Familiar plan", 29.90)
    val book = Book("The Hitchhiker's Guide to the Galaxy", 120.00)
    val music = Digital("Stairway to Heaven", 5.00)

    val customer = Customer()

    var order : Order = OrderService.createOrder(
        listOf(
            OrderItem(shirt, 2),
            OrderItem(netflix, 1),
            OrderItem(book, 1),
            OrderItem(music, 1)
        ),
        customer,
        Address()
    )

    order = OrderService.pay(order, CreditCard("43567890-987654367"))
    val products = order.items.map { item -> item.product }

    ShippingService.generateLabel(products)
    MembershipService.activate(products,customer)
    DigitalService.activate(products, customer)
}