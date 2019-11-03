package com.challange.domain.interfaces

import com.challange.domain.entities.Customer

interface IOrderInterface {
    fun executePayment()
    fun generateThreatment()
    fun activateSubscription(customer: Customer)
    fun generateShippingLabel(isARegularBook: Boolean)
}