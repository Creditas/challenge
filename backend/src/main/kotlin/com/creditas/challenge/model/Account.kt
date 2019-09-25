package com.creditas.challenge.model

import com.creditas.challenge.utils.Patterns.Companion.emailRegex

data class Account(val name: String, val email: String, private val clrPassword: String) {

    val password: String by lazy { encryptPassword(clrPassword) }
    val addressBook = hashSetOf<Address>()
    val wallet = linkedSetOf<PaymentMethod>()

    init {
        require(name.isNotEmpty()) { "Name cannot be blank" }
        validatePassword(clrPassword)
        validateEmail(email)
    }

    fun addAddress(address: Address) = apply { addressBook.add(address) }

    fun deleteAddress(address: Address) = apply { addressBook.remove(address) }

    fun addPaymentMethod(paymentMethod: PaymentMethod) = apply { wallet.add(paymentMethod) }

    fun deletePaymentMethod(paymentMethod: PaymentMethod) = apply { wallet.remove(paymentMethod) }

    fun getDefaultPaymentMethod(): PaymentMethod? {
        //TODO("Implement preferred payment option")
        return if (wallet.isEmpty()) null else wallet.iterator().next()
    }

    private fun encryptPassword(clearTextPassword: String): String {
        //TODO("encrypt password with SHA-256/512 encryption")
        return clearTextPassword.hashCode().toString()
    }

    private fun validatePassword(password: String) {
        //TODO("include rules for password")
        require(password.isNotEmpty()) { "Password must not be blank" }
    }

    private fun validateEmail(email: String) {
        require(emailRegex.matcher(email).matches()) { "Invalid email address" }
    }

}