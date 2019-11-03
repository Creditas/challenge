package com.challange.domain.entities

import com.challange.domain.enum.ETypeOfPayment
import com.challange.domain.interfaces.IPayment
import com.challange.domain.interfaces.IPaymentMethod
import com.sun.istack.internal.NotNull
import java.lang.Exception
import java.util.*

open class Payment(
        @NotNull override var customer: Customer,
        @NotNull override var paidDate: Date,
        @NotNull override var expireDate: Date,
        @NotNull override var typeOfPayment: ETypeOfPayment,
        @NotNull override var totalPaid: Double) : IPaymentMethod, IPayment {


    var paymentNumber: String = Math.random().toString().toUpperCase()

    override fun pay(orderItem: OrderItem) {
        if (orderItem.productsAdded.count() == 0)
            throw Exception("Empty order can not be paid!")
    }
}