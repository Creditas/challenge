package domain.order

import domain.address.Address
import domain.customer.Customer
import domain.order.exceptions.OrderAlreadyPayed
import domain.order.exceptions.PayEmptyOrderException
import domain.payment.CreditCard
import domain.payment.Payment
import domain.payment.ProductType
import domain.product.Digital
import domain.product.Physical
import domain.product.Signature
import domain.product.exceptions.ProductAlreadyAddedException
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.util.*

class OrderTest {

    private val physicalProduct = Physical(
            name = "Pants",
            price = 5.0,
            type = ProductType.PHYSICAL
    )

    private val digitalProduct = Digital(
            name = "Music",
            price = 12.0,
            type = ProductType.DIGITAL
    )

    private val items: MutableList<OrderItem> = mutableListOf(
            OrderItem(physicalProduct, 2), OrderItem(digitalProduct, 1)
    )

    private val order: Order by lazy {
        Order(
                customer = Customer(),
                address = Address(),
                items = items
        )
    }

    private val creditCard = CreditCard("43567890-987654367")

    @Test
    fun `should return total amount of order items`() {
        val expectedAmount = 22.0
        val totalAmount = order.totalAmount()

        assertEquals(expectedAmount, totalAmount, 1.0)
    }

    @Test
    fun `should add product successfully`() {
        val spotify = Signature(
                name = "Spotify Premium",
                price = 16.90,
                type = ProductType.MEMBERSHIP
        )

        val orderItem = OrderItem(spotify, 1)

        order.addProduct(spotify, 1)

        assertTrue(order.items.contains(orderItem))
    }

    @Test(expected = ProductAlreadyAddedException::class)
    fun `should throw exception when product has already been added to items`() {
        val spotify = Signature(
                name = "Spotify Premium",
                price = 16.90,
                type = ProductType.MEMBERSHIP
        )

        order.addProduct(spotify, 1)
        order.addProduct(spotify, 1)
    }

    @Test
    fun `should pay order successfully and return payed order`() {
        val expectedPayment = Payment(order, creditCard)
        order.pay(creditCard)

        assertEquals(expectedPayment, order.payment)
        assertEquals(Date(), order.closedAt)

    }

    @Test(expected = OrderAlreadyPayed::class)
    fun `should throw exception when try to pay an already payed order`() {
        order.pay(creditCard)
        order.pay(creditCard)
    }

    @Test(expected = PayEmptyOrderException::class)
    fun `should throw exception when try to pay empty order`() {
        order.items.removeAll(items)

        order.pay(creditCard)
    }
}