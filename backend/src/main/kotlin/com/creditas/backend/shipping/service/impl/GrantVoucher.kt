package com.creditas.backend.shipping.service.impl

import java.math.BigDecimal

class GrantVoucher {

    fun generate(total: BigDecimal) {
        println("Generating R$ ${total} voucher for your next order.")
    }
}