package com.creditas.challenge.model

import java.math.BigDecimal
import java.time.YearMonth

interface PaymentMethod {

    fun charge(amount: BigDecimal): Boolean
}

data class CreditCard(val nameOnCard: String,
                      val number: String,
                      val securityCode: Int,
                      val expiresAt: YearMonth) : PaymentMethod {

    override fun charge(amount: BigDecimal): Boolean {
        //TODO("attempt transaction with payment broker")
        return true
    }
}
