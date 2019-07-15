package challenge.entity

import org.junit.jupiter.api.Test
import kotlin.test.junit5.JUnit5Asserter

internal class InvoiceTest : BaseTest() {

    @Test
    fun `Assert billing address from invoice equals address from order`() {
        JUnit5Asserter.assertSame(expected = super.order.address, actual = super.invoice.billingAddress, message = null)
    }

    @Test
    fun `Assert shipping sddress from invoice equals address from order`() {
        JUnit5Asserter.assertSame(expected = super.order.address, actual = super.invoice.shippingAddress, message = null)
    }

    @Test
    fun `Assert order from invoice equals order`() {
        JUnit5Asserter.assertSame(expected = super.order, actual = super.invoice.order, message = null)
    }

}
