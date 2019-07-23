package com.creditas.service.fulfillment

import com.creditas.model.Order
import com.creditas.service.EmailService
import com.creditas.service.VoucherService
import java.math.BigDecimal

class DigitalFulfillmentStrategy : FulfillmentStrategy {

    override fun fulfill(order: Order) {
        EmailService().sendEmail(order.customer.emailTo, "digital_item_purchase", HashMap())
        VoucherService().generate(BigDecimal.TEN)
    }

}