package challenge.service

import challenge.entity.BaseTest
import challenge.entity.Subscription
import org.junit.jupiter.api.Test
import kotlin.test.junit5.JUnit5Asserter

internal class SubscriptionServiceTest : BaseTest() {

    @Test
    fun `Assert instance is not null`() {
        JUnit5Asserter.assertNotNull(actual = SubscriptionService.instance, message = null)
    }

    @org.junit.jupiter.api.Test
    fun `Assert instance is always the same`() {
        JUnit5Asserter.assertSame(actual = SubscriptionService.instance, expected = SubscriptionService.instance, message = null)
    }

    @Test
    fun `Assert subscribe`() {
        val subscription = SubscriptionService.instance.subscribe(super.order, super.orderItem)
        val expected = Subscription(super.order.customer, super.orderItem)

        JUnit5Asserter.assertNotNull(actual = subscription, message = null)
        JUnit5Asserter.assertEquals(actual = subscription, expected = expected, message = null)
    }
}
