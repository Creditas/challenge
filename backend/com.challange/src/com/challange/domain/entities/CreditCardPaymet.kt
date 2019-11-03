package com.challange.domain.entities

import com.challange.domain.enum.ETypeOfPayment
import com.challange.domain.interfaces.IPaymentMethod
import java.util.*

class CreditCardPaymet(var creditCardNumber: String,
                       var creditCardName: String,
                       var expireCreditCardDate: Date,
                       var cvv: String,
                       override var customer: Customer,
                       override var paidDate: Date,
                       override var expireDate: Date,
                       override var typeOfPayment: ETypeOfPayment,
                       override var totalPaid: Double) : IPaymentMethod {
}