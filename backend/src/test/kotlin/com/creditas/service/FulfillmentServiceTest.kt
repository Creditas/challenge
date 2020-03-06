package com.creditas.service

import com.creditas.model.*
import com.creditas.service.fulfillment.PhysicalFulfillmentStrategy
import org.junit.Test
import org.mockito.Mockito

class FulfillmentServiceTest {


    private val customer = Customer("email@email.com")
    private val address = Address()
    private val service = FulfillmentService()


    @Test(expected = Exception::class)
    fun `fulfill an order without payment`() {
        val order = Order(customer, address)
        val product = Product("Us and them", ProductType.DIGITAL, 3.00)
        order.addProduct(product, 1)
        service.fulfill(order)
    }
}