package com.creditas.service.fulfillment

import com.creditas.model.Address
import com.creditas.model.Customer
import com.creditas.model.Order
import com.creditas.service.ShippingLabelService
import org.junit.Test
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify

internal class PhysicalFulfillmentStrategyTest {


    @Test
    fun `PhysicalFulfillmentStrategy should call ShippingLabelService`() {
        val shippingLabelService = mock(ShippingLabelService::class.java)
        val strategy = PhysicalFulfillmentStrategy(shippingLabelService)
        val order = Order(Customer("email@email.com"), Address())
        strategy.fulfill(order)
        verify(shippingLabelService).generate(order)
    }
}