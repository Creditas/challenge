package com.creditas.service.fulfillment

import com.creditas.model.Order
import com.creditas.service.EmailService

class MembershipFulfillmentStrategy(val emailService: EmailService) : FulfillmentStrategy {

    override fun fulfill(order: Order) {
        println("Membership activate! Sending email to customer!")
        emailService.sendEmail(order.customer.emailTo,"membership_activation", HashMap())
    }

}