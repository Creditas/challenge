package main.kotlin.core

import main.kotlin.core.domain.address.Address
import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.order.Order
import main.kotlin.core.domain.payment.CreditCard
import main.kotlin.core.domain.product.*

class Application
fun main(){
    val shirt = Physical("Flowered t-shirt", 35.00)
    val netflix = Membership("Familiar plan", 29.90)
    val book = Book("The Hitchhiker's Guide to the Galaxy", 120.00)
    val music = Digital("Stairway to Heaven", 5.00)

    val order = Order(Customer("John"), Address())

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    order.pay(CreditCard("43567890-987654367"))
    order.shipItems()
}