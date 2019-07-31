package com.creditas.service.fulfillment

import com.creditas.model.Address
import com.creditas.model.Customer
import com.creditas.model.Order
import com.creditas.service.ShippingLabelService
import org.junit.Test
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify

class BookFulfillmentStrategyTest {

    private val ADDITIONAL_INFO = "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."

    @Test
    fun `BookFulfillmentStrategy should generate shipping label`() {
        val shippingLabelService = mock(ShippingLabelService::class.java)
        val bookFulfillmentStrategy = BookFulfillmentStrategy(shippingLabelService)

        val order = Order(Customer("email@email.com"), Address())
        bookFulfillmentStrategy.fulfill(order)

        verify(shippingLabelService).generate(order, ADDITIONAL_INFO)
    }
}