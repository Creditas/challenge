package com.creditas.challenge.model

data class Account(val name: String, val email: String, private val clrPassword: String) {

    val password: String by lazy { encryptPassword(clrPassword) }
    val addressBook = mutableSetOf<Address>()

    init {
        require(name.isNotEmpty()) { "Name cannot be blank" }
        validatePassword(clrPassword)
        validateEmail(email)
    }

    fun addAddress(address: Address) = apply { addressBook.add(address) }

    fun deleteAddress(address: Address) = apply { addressBook.remove(address) }

    private fun encryptPassword(clearTextPassword: String): String {
        //TODO("encrypt password with SHA-256/512 encryption")
        return clearTextPassword.hashCode().toString()
    }

    private fun validatePassword(password: String) {
        //TODO("include rules for password")
        require(password.isNotEmpty()) { "Password must not be blank" }
    }

    private fun validateEmail(email: String) {
        //TODO("include regex validation for email")
        require(email.isNotEmpty()) { "Invalid email address" }
    }

}