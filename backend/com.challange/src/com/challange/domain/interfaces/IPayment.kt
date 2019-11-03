package com.challange.domain.interfaces

import com.challange.domain.entities.OrderItem

interface IPayment {
    fun pay(orderItem: OrderItem)
}