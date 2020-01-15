package main.kotlin.core.domain.customer

import main.kotlin.core.domain.voucher.Voucher

class Customer(val name: String){
    private val vouchers = mutableListOf<Voucher>()

    fun addVoucher(voucher: Voucher) {
        vouchers.add(voucher)
    }

    fun getVouchers() : List<Voucher>{
        return vouchers
    }
}