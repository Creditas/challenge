import domain.address.Address
import domain.customer.Customer
import domain.order.Order
import domain.payment.CreditCard
import domain.payment.ProductType
import domain.product.Book
import domain.product.Digital
import domain.product.Physical
import domain.product.Product.*
import domain.product.Signature
import domain.shipment.ShipmentContext

fun main(args: Array<String>) {

    val shirt = Physical("Flowered t-shirt", ProductType.PHYSICAL, 35.00)
    val netflix = Signature("Familiar plan", ProductType.MEMBERSHIP, 29.90)
    val book = Book("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00)
    val music = Digital("Stairway to Heaven", ProductType.DIGITAL, 5.00)

    val order = Order(Customer(), Address())

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    order.pay(CreditCard("43567890-987654367"))
    // now, how to deal with shipping rules then?
}