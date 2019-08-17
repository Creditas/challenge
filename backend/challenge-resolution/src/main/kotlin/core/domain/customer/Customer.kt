package main.kotlin.core.domain.customer

import main.kotlin.core.domain.voucher.Voucher

class Customer {
    private val vouchers = mutableListOf<Voucher>()

    fun addVoucher(voucher: Voucher) {
        vouchers.add(voucher)
    }
}