package test

import main.kotlin.core.domain.address.Address
import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.order.Order
import main.kotlin.core.domain.payment.CreditCard
import main.kotlin.core.domain.product.*
import main.kotlin.core.exception.OrderAlreadyPayException
import main.kotlin.core.exception.OrderEmptyCanBePaidException
import main.kotlin.core.exception.ProductAlreadyAddedException
import org.junit.After
import org.junit.Assert
import org.junit.Before
import org.junit.Test

class OrderTest{
    lateinit var shirt : Product
    lateinit var netflix: Product
    lateinit var book: Product
    lateinit var music: Product
    lateinit var order: Order

    @Before
    fun setUp(){
        order = Order(Customer("John"), Address())
    }

    @Test(expected = ProductAlreadyAddedException::class)
    fun productsAreBeingAddedToOrderAndProductIsAddedTwice(){
        givenProducts()
        whenProductsAreAddedToOrder()
        whenAProductIsAddedTwice()
    }

    private fun givenProducts() {
        shirt = Physical("Flowered t-shirt", 35.00)
        netflix = Membership("Familiar plan", 29.90)
        book = Book("The Hitchhiker's Guide to the Galaxy", 120.00)
        music = Digital("Stairway to Heaven", 5.00)
    }

    private fun whenProductsAreAddedToOrder(){
        order.addProduct(shirt, 2)
        order.addProduct(netflix, 1)
        order.addProduct(book, 1)
        order.addProduct(music, 1)
    }

    private fun whenAProductIsAddedTwice() {
        order.addProduct(shirt, 2)
    }

    @Test(expected = OrderAlreadyPayException::class)
    fun orderIsPayAndTriedToPayTwice(){
        givenProducts()
        whenProductsAreAddedToOrder()
        whenAOrderIsPaid()
        thenTryToPayItAgain()
    }

    private fun whenAOrderIsPaid() {
        order.pay(CreditCard("2223334445556"))
    }

    private fun thenTryToPayItAgain() {
        order.pay(CreditCard("2223334445556"))
    }

    @Test(expected = OrderEmptyCanBePaidException::class)
    fun andEmptyOrderIsPay(){
        givenProducts()
        whenAOrderIsPaid()
    }

    @Test
    fun productsAreAddedToOrderAndTotalAmountIsTheExpected(){
        givenProducts()
        whenProductsAreAddedToOrder()
        thenTheTotalAmountIs(224.90)
    }

    private fun thenTheTotalAmountIs(amount: Double) {
        Assert.assertEquals(amount, order.totalAmount, 0.001)
    }

    @Test
    fun orderIsPaidAndThenIsProperlyClosed(){
        givenProducts()
        whenProductsAreAddedToOrder()
        whenAOrderIsPaid()
        thenTheOrderIsClosed()
    }

    private fun thenTheOrderIsClosed() {
        Assert.assertTrue(order.closedAt != null)
    }

    @After
    fun clear(){
        order = Order(Customer("John"), Address())
    }
}