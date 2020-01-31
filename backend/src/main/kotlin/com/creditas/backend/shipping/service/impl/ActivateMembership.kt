package com.creditas.backend.shipping.service.impl

import com.creditas.backend.domain.Customer

class ActivateMembership {

    fun activate(customer: Customer) {
        println("Activating ${customer.email} membership...")
        customer.membership = true
    }
}