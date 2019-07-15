package challenge.entity

import challenge.enum.ProductType
import challenge.model.Address
import challenge.model.CreditCard
import org.junit.jupiter.api.Test
import java.util.Date
import kotlin.test.junit5.JUnit5Asserter

internal class PaymentTest : BaseTest() {

    @Test
    fun `Assert payment has paidAt date`() {
        JUnit5Asserter.assertNotNull(actual = super.payment.paidAt, message = null)
    }

    @Test
    fun `Assert payment has authorization number`() {
        JUnit5Asserter.assertNotNull(actual = super.payment.authorizationNumber, message = null)
    }

    @Test
    fun `Assert payment authorization number is date`() {
        JUnit5Asserter.assertEquals(actual = super.payment.paidAt, expected = Date(super.payment.authorizationNumber), message = null)
    }

    @Test
    fun `Assert payment has amount`() {
        JUnit5Asserter.assertNotNull(actual = super.payment.amount, message = null)
        JUnit5Asserter.assertTrue(actual = super.payment.amount > 0, message = null)
    }

    @Test
    fun `Assert payment amount equals sum of prices is 0`() {
        val order = Order(Customer(), Address())
        val total = order.getOrderItems().sumByDouble { it.total }

        val payment = Payment(order, CreditCard("0000-0000-0000-0000"))

        JUnit5Asserter.assertEquals(actual = payment.amount, expected = total, message = null)
    }

    @Test
    fun `Assert payment amount equals sum of prices is total amount of products`() {
        val order = Order(Customer(), Address())
        order.addProduct(Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00), 2)
        order.addProduct(Product("Familiar plan", ProductType.MEMBERSHIP, 29.90), 1)
        order.addProduct(Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00), 1)
        order.addProduct(Product("Stairway to Heaven", ProductType.DIGITAL, 5.00), 1)

        val payment = Payment(order, CreditCard("0000-0000-0000-0000"))

        val total = order.getOrderItems().sumByDouble { it.total }
        JUnit5Asserter.assertEquals(actual = payment.amount, expected = total, message = null)
    }

    @Test
    fun `Assert payment has invoice`() {
        JUnit5Asserter.assertNotNull(actual = super.payment.invoice, message = null)
        JUnit5Asserter.assertEquals(actual = super.payment.invoice.order, expected = super.order, message = null)
    }

}
