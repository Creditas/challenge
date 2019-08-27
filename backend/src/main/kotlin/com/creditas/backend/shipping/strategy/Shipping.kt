package com.creditas.backend.shipping.strategy

import com.creditas.backend.domain.Order

interface Shipping {

    fun ship(order: Order)

}