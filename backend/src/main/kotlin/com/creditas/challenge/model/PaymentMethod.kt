package com.creditas.challenge.model

import java.math.BigDecimal
import java.time.YearMonth

interface PaymentMethod {

    val billingAddress: Address

    fun charge(amount: BigDecimal): Boolean
}

data class CreditCard(val nameOnCard: String,
                      val number: String,
                      val securityCode: Int,
                      val expiresAt: YearMonth,
                      override val billingAddress: Address) : PaymentMethod {

    override fun charge(amount: BigDecimal): Boolean {
        //TODO("attempt transaction with payment broker")
        return true
    }
}
