package com.creditas.service.fulfillment

import com.creditas.model.Address
import com.creditas.model.Customer
import com.creditas.model.Order
import com.creditas.service.EmailService
import org.junit.Test
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify

class MembershipFulfillmentStrategyTest {

    @Test
    fun `MembershipFulfillmentStrategyTest should send email` () {
        val emailService = mock(EmailService::class.java)
        val membershipFulfillmentStrategy = MembershipFulfillmentStrategy(emailService)
        membershipFulfillmentStrategy.fulfill(Order(Customer("email@email.com"), Address()))
        verify(emailService).sendEmail("email@email.com", "membership_activation", HashMap())
    }
}