package challenge.service

import challenge.entity.BaseTest
import challenge.entity.DiscountVoucher
import org.junit.jupiter.api.Test
import kotlin.test.junit5.JUnit5Asserter

internal class DiscountServiceTest : BaseTest() {

    @Test
    fun `Assert instance is not null`() {
        JUnit5Asserter.assertNotNull(actual = DiscountService.instance, message = null)
    }

    @Test
    fun `Assert instance is always the same`() {
        JUnit5Asserter.assertSame(actual = DiscountService.instance, expected = DiscountService.instance, message = null)
    }

    @Test
    fun `Assert discountVoucher`() {
        val discountVoucher = DiscountService.instance.grantDiscount(super.order, 20)
        val expected = DiscountVoucher(super.order.customer, 20)

        JUnit5Asserter.assertNotNull(actual = discountVoucher, message = null)
        JUnit5Asserter.assertEquals(actual = discountVoucher, expected = expected, message = null)
    }
}
