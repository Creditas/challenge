package challenge

import challenge.model.*
import challenge.services.*


fun main(args : Array<String>) {
    val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00)
    val netflix = Product("Familiar plan", ProductType.MEMBERSHIP, 29.90)
    val book = Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00)
    val music = Product("Stairway to Heaven", ProductType.DIGITAL, 5.00)

    val order = Order(Customer(), Address())

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    order.pay(CreditCard("43567890-987654367"))
    // now, how to deal with shipping rules then?

    val processors = listOf(BookItemProcessor(),DigitalItemProcessor(),PhysicalItemProcessor(),MembershipItemProcessor())
    val factory = ShippingOrderProcessorFactory(processors)
    order.getItems().forEach { i->factory.build(i).process(order.customer,i) }

}