package com.creditas.model

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Test

class OrderTest {

    private val customer = Customer("email@email.com")
    private val address = Address()

    @Test
    fun `addProduct a product`() {
        val order = Order(customer, address)
        val product = Product("Us and them", ProductType.DIGITAL, 3.00)
        assertEquals(0, order.totalItems)
        order.addProduct(product, 1)
        assertEquals(3.00, order.totalAmount, 0.01)
        assertEquals(1, order.totalItems)
    }

    @Test(expected = IllegalArgumentException::class)
    fun `addProduct with 0 quantity`() {
        val order = Order(customer, address)
        val product = Product("Us and them", ProductType.DIGITAL, 3.00)
        assertEquals(0, order.totalItems)
        order.addProduct(product, 0)
    }

    @Test(expected = Exception::class)
    fun `addProduct add same product twice should throw exception`() {
        val order = Order(customer, address)
        val product = Product("Us and them", ProductType.DIGITAL, 3.00)
        assertEquals(0, order.totalItems)
        order.addProduct(product, 1)
        order.addProduct(product, 1)
    }

    @Test
    fun `pay an order`() {
        val order = Order(customer, address)
        val product = Product("Us and them", ProductType.DIGITAL, 3.00)
        order.addProduct(product, 1)
        order.pay(CreditCard("1234567890123456"))
        assertNotNull(order.payment)
        assertNotNull(order.closedAt)
    }

    @Test(expected = Exception::class)
    fun `pay an order twice`() {
        val order = Order(customer, address)
        val product = Product("Us and them", ProductType.DIGITAL, 3.00)
        order.addProduct(product, 1)
        order.pay(CreditCard("1234567890123456"))
        assertNotNull(order.payment)
        assertNotNull(order.closedAt)
        order.pay(CreditCard("1234567890123456"))
    }

    @Test(expected = Exception::class)
    fun `pay an empty order`() {
        val order = Order(customer, address)
        order.pay(CreditCard("1234567890123456"))
    }
}
