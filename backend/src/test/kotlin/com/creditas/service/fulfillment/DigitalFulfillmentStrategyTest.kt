package com.creditas.service.fulfillment

import com.creditas.model.Address
import com.creditas.model.Customer
import com.creditas.model.Order
import com.creditas.service.EmailService
import com.creditas.service.VoucherService
import org.junit.Test

import org.junit.Assert.*
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify
import java.math.BigDecimal

class DigitalFulfillmentStrategyTest {

    @Test
    fun `DigitalFulfillmentStrategy should send email and generate voucher`() {
        val emailService = mock(EmailService::class.java)
        val voucherService = mock(VoucherService::class.java)
        val digitalFulfillmentStrategy = DigitalFulfillmentStrategy(emailService, voucherService)
        digitalFulfillmentStrategy.fulfill(Order(Customer("email@email.com"), Address()))
        verify(emailService).sendEmail("email@email.com", "digital_item_purchase", HashMap())
        verify(voucherService).generate(BigDecimal.TEN)
    }
}