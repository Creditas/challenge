package test

import main.kotlin.core.domain.address.Address
import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.order.Order
import main.kotlin.core.domain.product.Book
import main.kotlin.core.domain.product.Digital
import main.kotlin.core.domain.product.Membership
import main.kotlin.core.domain.product.Physical
import main.kotlin.core.exception.ProductAlreadyAddedException
import org.junit.Assert
import org.junit.Before
import org.junit.Test

class OrderTest{
    val shirt = Physical("Flowered t-shirt", 35.00)
    val netflix = Membership("Familiar plan", 29.90)
    val book = Book("The Hitchhiker's Guide to the Galaxy", 120.00)
    val music = Digital("Stairway to Heaven", 5.00)
    lateinit var order: Order;

    @Before
    fun setUp(){
        order = Order(Customer("John"), Address())
    }

    @Test(expected = ProductAlreadyAddedException::class)
    fun productsAreBeingAddedToOrderAndProductIsAddedTwice(){
        givenProducts()
        whenAProductIsAddedTwice()
    }

    private fun givenProducts() {
        order.addProduct(shirt, 2)
        order.addProduct(netflix, 1)
        order.addProduct(book, 1)
        order.addProduct(music, 1)
    }

    private fun whenAProductIsAddedTwice() {
        order.addProduct(shirt, 2)
    }

}