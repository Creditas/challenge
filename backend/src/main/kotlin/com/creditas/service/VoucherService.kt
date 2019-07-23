package com.creditas.service

import java.math.BigDecimal

class VoucherService {

    fun generate(value: BigDecimal) {
        println("Generated voucher with value = ${value}")
    }
}