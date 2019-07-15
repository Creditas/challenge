package challenge

import challenge.entity.BaseTest
import challenge.entity.DiscountVoucher
import challenge.entity.Product
import challenge.entity.Subscription
import challenge.enum.ProductType
import challenge.model.OrderItem
import challenge.service.DiscountService
import challenge.service.EmailService
import challenge.service.PrinterService
import challenge.service.SubscriptionService
import com.nhaarman.mockitokotlin2.any
import com.nhaarman.mockitokotlin2.mock
import com.nhaarman.mockitokotlin2.spy
import com.nhaarman.mockitokotlin2.times
import com.nhaarman.mockitokotlin2.verify
import com.nhaarman.mockitokotlin2.whenever
import org.junit.jupiter.api.Test

internal class OrderItemRulesTest : BaseTest() {

    private val discountServiceMock = mock<DiscountService>()
    private val emailServiceMock = mock<EmailService>()
    private val printerServiceMock = mock<PrinterService>()
    private val subscriptionServiceMock = mock<SubscriptionService>()

    @Test
    fun `Assert processing ProductPhysicalRule`() {
        val orderItem = OrderItem(Product("", ProductType.PHYSICAL, 1.0), 1)
        val spyService = spy(printerServiceMock)
        val instance = OrderItemRules.ProductPhysicalRule(spyService)

        instance.process(order, orderItem)

        verify(spyService, times(1)).printLabel(any(), any())
    }

    @Test
    fun `Assert processing ProductBookRule`() {
        val orderItem = OrderItem(Product("", ProductType.BOOK, 1.0), 1)
        val spyService = spy(printerServiceMock)
        val instance = OrderItemRules.ProductBookRule(spyService)

        instance.process(order, orderItem)

        verify(spyService, times(1)).printTaxExceptionLabel(any(), any())
    }

    @Test
    fun `Assert processing ProductDigitalRule`() {
        val orderItem = OrderItem(Product("", ProductType.DIGITAL, 1.0), 1)
        val spyEmailService = spy(emailServiceMock)
        val spyDiscountService = spy(discountServiceMock)
        val instance = OrderItemRules.ProductDigitalRule(spyEmailService, spyDiscountService)

        instance.process(order, orderItem)

        verify(spyEmailService, times(1)).sendPurchaseDescription(any(), any())
        verify(spyDiscountService, times(1)).grantDiscount(any(), any())
        verify(spyEmailService, times(1)).sendDiscountVoucher(any())

        whenever(spyDiscountService.grantDiscount(order, 10)).thenReturn(DiscountVoucher(order.customer, 10))
    }

    @Test
    fun `Assert processing ProductMembershipRule`() {
        val orderItem = OrderItem(Product("", ProductType.MEMBERSHIP, 1.0), 1)
        val spyEmailService = spy(emailServiceMock)
        val spySubscriptionService = spy(subscriptionServiceMock)
        val instance = OrderItemRules.ProductMembershipRule(spyEmailService, spySubscriptionService)

        instance.process(order, orderItem)

        verify(spySubscriptionService, times(1)).subscribe(any(), any())
        verify(spyEmailService, times(1)).sendSubscription(any())

        whenever(spySubscriptionService.subscribe(order, orderItem)).thenReturn(Subscription(order.customer, orderItem))
    }

}
