package com.creditas.backend.shipping.strategy.impl

import com.creditas.backend.domain.Order
import com.creditas.backend.shipping.service.impl.ActivateMembership
import com.creditas.backend.shipping.service.impl.SendEmail
import com.creditas.backend.shipping.strategy.Shipping

class SubscriptionShipping(val activateMembership: ActivateMembership, val sendEmail: SendEmail) : Shipping {

    override fun ship(order: Order) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}