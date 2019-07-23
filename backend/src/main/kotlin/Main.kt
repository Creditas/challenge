import com.creditas.model.Product;
import com.creditas.model.ProductType;
import com.creditas.model.Order;
import com.creditas.model.Customer;
import com.creditas.model.Address;
import com.creditas.model.CreditCard;

fun main() {
    val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00)
    val netflix = Product("Familiar plan", ProductType.MEMBERSHIP, 29.90)
    val book = Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00)
    val music = Product("Stairway to Heaven", ProductType.DIGITAL, 5.00)

    val order = Order(Customer("challenge@creditas.com.br"), Address())

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    order.pay(CreditCard("43567890-987654367"))
    // now, how to deal with shipping rules then?
}