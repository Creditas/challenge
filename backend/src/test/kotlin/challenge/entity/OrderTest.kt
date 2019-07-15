package challenge.entity

import challenge.enum.ProductType
import challenge.model.Address
import challenge.model.CreditCard
import challenge.model.OrderItem
import org.junit.jupiter.api.Test
import kotlin.test.junit5.JUnit5Asserter

internal class OrderTest : BaseTest() {

    @Test
    fun `Assert order amount equals sum of prices`() {
        val total = super.order.getOrderItems().sumByDouble { it.total }
        JUnit5Asserter.assertEquals(actual = super.order.totalAmount, expected = total, message = null)
    }

    @Test
    fun `Assert add product`() {
        val order = Order(Customer(), Address())
        order.addProduct(super.product, 2)
        val expected = OrderItem(super.product, 2)

        JUnit5Asserter.assertEquals(actual = super.order.getOrderItems().last(), expected = expected, message = null)
    }

    @Test
    fun `Assert total equals`() {
        val price = 15.5
        val quantity = 2
        val expected = price * quantity
        val orderItem = OrderItem(Product("New Product", ProductType.MEMBERSHIP, price), quantity)

        JUnit5Asserter.assertEquals(actual = orderItem.total, expected = expected, message = null)
    }

    @Test
    fun `Assert order has payment and closedAt is null`() {
        JUnit5Asserter.assertNull(actual = super.order.payment, message = null)
        JUnit5Asserter.assertNull(actual = super.order.closedAt, message = null)
    }

    @Test
    fun `Assert order has payment and closedAt when is payed`() {
        val paymentMethod = CreditCard("0000-0000-0000-0000")
        super.order.pay(paymentMethod)

        JUnit5Asserter.assertNotNull(actual = super.order.payment, message = null)
        JUnit5Asserter.assertNotNull(actual = super.order.closedAt, message = null)
    }

    @Test
    fun `Assert order payment data`() {
        val paymentMethod = CreditCard("0000-0000-0000-0000")
        super.order.pay(paymentMethod)

        val payment = super.order.payment!!

        JUnit5Asserter.assertNotNull(actual = payment.order, message = null)
        JUnit5Asserter.assertEquals(actual = payment.order, expected = super.order, message = null)
        JUnit5Asserter.assertNotNull(actual = payment.paymentMethod, message = null)
        JUnit5Asserter.assertEquals(actual = payment.paymentMethod, expected = paymentMethod, message = null)
        JUnit5Asserter.assertNotNull(actual = payment.invoice, message = null)
        JUnit5Asserter.assertEquals(actual = payment.invoice.order, expected = super.order, message = null)
    }

}
