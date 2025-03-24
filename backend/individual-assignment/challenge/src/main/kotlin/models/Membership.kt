package org.example.models

import org.example.dtos.Customer

interface Membership {
    fun activateMembership(customer: Customer): String
}