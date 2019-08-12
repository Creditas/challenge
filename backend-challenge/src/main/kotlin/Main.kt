import domain.address.Address
import domain.customer.Customer
import domain.order.Order
import domain.payment.ProductType
import domain.product.*
import domain.product.Product.*
import domain.shipment.ShipmentContext

fun main(args: Array<String>) {

    val shirt = Physical("Flowered t-shirt", ProductType.PHYSICAL, 35.00)
    val netflix = Signature("Familiar plan", ProductType.MEMBERSHIP, 29.90)
    val book = Book("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00)
    val music = Digital("Stairway to Heaven", ProductType.DIGITAL, 5.00)

    val order = Order(Customer(), Address(), null, null)

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    val payedOrder = order.pay(domain.payment.CreditCard("43567890-987654367"))
    // now, how to deal with shipping rules then?

    payedOrder.items.forEach {
        ShipmentContext().prepareProductToShipping(it.product)
    }
}