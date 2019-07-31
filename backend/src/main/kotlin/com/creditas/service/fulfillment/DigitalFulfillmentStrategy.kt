package com.creditas.service.fulfillment

import com.creditas.model.Order
import com.creditas.service.EmailService
import com.creditas.service.VoucherService
import java.math.BigDecimal

class DigitalFulfillmentStrategy(val emailService : EmailService, val voucherService : VoucherService) : FulfillmentStrategy {

    override fun fulfill(order: Order) {
        emailService.sendEmail(order.customer.emailTo, "digital_item_purchase", HashMap())
        voucherService.generate(BigDecimal.TEN)
    }

}