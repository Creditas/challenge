package br.com.jsc.challenge.domain

class Customer {
    var vouchers = mutableListOf<Voucher>()
        private set

    fun addVoucher(voucher: Voucher) {
        vouchers.add(voucher)
    }
}