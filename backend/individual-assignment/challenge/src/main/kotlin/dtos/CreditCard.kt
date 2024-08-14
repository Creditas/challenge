package org.example.dtos

import org.example.models.PaymentMethod

data class CreditCard(
    val number: String
) : PaymentMethod
