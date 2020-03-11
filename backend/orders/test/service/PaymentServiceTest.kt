package service

import challenge.model.*
import challenge.service.PaymentService
import challenge.service.paymentstrategy.PaymentDigitalStrategy
import org.junit.Test
import kotlin.test.assertNotNull

class PaymentServiceTest {

    private val paymentService = PaymentService()

    @Test(expected = Exception::class)
    fun processPaymentWhenOrderAlreadyHasPayment_then_ShouldThrowException() {
        val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL,35.00)
        val order = Order(Customer("Henry", "Henry@email.com"), Address())
        order.addProduct(shirt, 1, PaymentDigitalStrategy())
        order.payment = Payment(order, CreditCard("12312312312"))

        paymentService.processPayment(CreditCard("12312312312"), order)
    }

    @Test(expected = Exception::class)
    fun processPaymentWhenOrderHasNoProducts_then_ShouldThrowException() {
        val order = Order(Customer("Henry", "Henry@email.com"), Address())
        paymentService.processPayment(CreditCard("12312312312"), order)
    }

    @Test
    fun processPaymentWithValidInfo_then_OrderShouldBeClosedAccordingly() {
        val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL,35.00)
        val order = Order(Customer("Henry", "Henry@email.com"), Address())
        order.addProduct(shirt, 1, PaymentDigitalStrategy())
        paymentService.processPayment(CreditCard("12312312312"), order)

        assertNotNull(order.closedAt)
    }

    @Test(expected = Exception::class)
    fun processPaymentWithDuplicatedProduct_then_ShouldThrowException() {
        val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL,35.00)
        val shirt2 = Product("Flowered t-shirt", ProductType.PHYSICAL,35.00)
        val order = Order(Customer("Henry", "Henry@email.com"), Address())
        order.addProduct(shirt, 1, PaymentDigitalStrategy())
        order.addProduct(shirt2, 1, PaymentDigitalStrategy())
        paymentService.processPayment(CreditCard("12312312312"), order)
    }
}