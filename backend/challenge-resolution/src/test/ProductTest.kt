package test

import main.kotlin.core.domain.address.Address
import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.order.Order
import main.kotlin.core.domain.payment.CreditCard
import main.kotlin.core.domain.payment.PaymentMethod
import main.kotlin.core.domain.product.*
import main.kotlin.core.domain.shipping.BookShipping
import main.kotlin.core.domain.shipping.DigitalShipping
import main.kotlin.core.domain.shipping.MembershipShipping
import main.kotlin.core.domain.shipping.PhysicalShipping
import org.junit.After
import org.junit.Assert
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test

class ProductTest{
    lateinit var shirt : Product
    lateinit var netflix: Product
    lateinit var book: Product
    lateinit var music: Product

    lateinit var shippedShirt : Product
    lateinit var shippedNetflix: Product
    lateinit var shippedBook: Product
    lateinit var shippedMusic: Product

    lateinit var order: Order
    lateinit var john: Customer
    lateinit var payment: PaymentMethod

    @Before
    fun setUp(){
        order = Order(Customer("John"), Address())
        shirt = Physical("Flowered t-shirt", 35.00)
        netflix = Membership("Familiar plan", 29.90)
        book = Book("The Hitchhiker's Guide to the Galaxy", 120.00)
        music = Digital("Stairway to Heaven", 5.00)
        payment = CreditCard("22222333344556678")
        john = Customer("John")
    }

    private fun givenBookAddedToOrder(){
        order.addProduct(book, 1)
    }

    private fun givenMembershipAddedToOrder(){
        order.addProduct(netflix, 1)
    }

    private fun givenPhysicalAddedToOrder(){
        order.addProduct(shirt, 1)
    }

    private fun givenDigitalAddedToOrder(){
        order.addProduct(music, 1)
    }

    @Test
    fun bookIsAddedToOrderAndThenIsShipped(){
        givenBookAddedToOrder()
        whenOrderIsPaidAndBookShipped()
        thenTheShippingLabelForBookIsGenerated()
    }

    private fun whenOrderIsPaidAndBookShipped() {
        shippedBook = BookShipping().shipping(book)
    }

    private fun thenTheShippingLabelForBookIsGenerated() {
        Assert.assertEquals("Tax-exempt item as provided in the Constitution Art. 150, VI, d", (shippedBook as Book).shippingLabel!!.description)
    }

    @Test
    fun shirtIsAddedToOrderAndThenIsShipped(){
        givenPhysicalAddedToOrder()
        whenOrderIsPaidAndShirtShipped()
        thenTheShippingLabelForShirtIsGenerated()
    }

    private fun whenOrderIsPaidAndShirtShipped() {
        shippedShirt = PhysicalShipping(customer = john).shipping(shirt)
    }

    private fun thenTheShippingLabelForShirtIsGenerated() {
        Assert.assertEquals("For: John", (shippedShirt as Physical).shippingLabel!!.description)
    }

    @Test
    fun netflixIsAddedToOrderAndThenIsShipped(){
        givenMembershipAddedToOrder()
        whenOrderIsPaidAndMembershipShipped()
        thenTheMembershipIsActivated()
    }

    private fun whenOrderIsPaidAndMembershipShipped() {
        shippedNetflix = MembershipShipping(customer = john).shipping(netflix)
    }

    private fun thenTheMembershipIsActivated() {
        Assert.assertTrue((shippedNetflix as Membership).isActivated)
    }

    @Test
    fun musicIsAddedToOrderAndThenIsShipped(){
        givenDigitalAddedToOrder()
        whenOrderIsPaidAndDigitalIsShipped()
        thenTheVoucherIsGeneratedWithTenDollars()
    }

    private fun whenOrderIsPaidAndDigitalIsShipped() {
        shippedMusic = DigitalShipping(customer = order.customer).shipping(music)
    }

    private fun thenTheVoucherIsGeneratedWithTenDollars() {
        Assert.assertEquals(10.0, order.customer.getVouchers().first().price, 0.01)
    }

    @After
    fun clear(){
        order = Order(john, Address())
    }
}