package com.creditas.service.fulfillment

import com.creditas.model.Order
import com.creditas.service.EmailService

class MembershipFulfillmentStrategy : FulfillmentStrategy {

    override fun fulfill(order: Order) {
        println("Membership activate! Sending email to customer!")
        EmailService().sendEmail(order.customer.emailTo,"membership_activation", HashMap())

    }

}