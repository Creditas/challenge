package com.creditas.challenge.model

data class Account(val name: String, val email: String, private val clrPassword: String) {

    val password: String by lazy { encryptPassword(clrPassword) }
    val addressBook = mutableSetOf<Address>()

    fun addAddress(address: Address) = apply { addressBook.add(address) }

    fun deleteAddress(address: Address) = apply { addressBook.remove(address) }

    private fun encryptPassword(clearTextPassword: String): String {
        //TODO("encrypt password with SHA-256/512 encryption")
        return clearTextPassword.hashCode().toString()
    }

}