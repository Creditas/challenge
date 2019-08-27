package com.creditas.backend.shipping.strategy.impl

import com.creditas.backend.domain.Order
import com.creditas.backend.shipping.service.impl.ActivateMembership
import com.creditas.backend.shipping.service.impl.SendEmail
import com.creditas.backend.shipping.strategy.Shipping

class SubscriptionShipping(val activateMembership: ActivateMembership, val sendEmail: SendEmail) : Shipping {

    override fun ship(order: Order) {
        activateMembership.activate(order.customer)

        if (order.customer.membership) {
            println("Membership activated!")
            sendEmail.send(order.customer.email, "Your Membership details!", "XYZ")
        }
    }
}