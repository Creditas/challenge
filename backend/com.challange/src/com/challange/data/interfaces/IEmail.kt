package com.challange.data.interfaces

import com.challange.domain.entities.Customer

interface IEmail {
    fun sendEmail(customer: Customer)
}