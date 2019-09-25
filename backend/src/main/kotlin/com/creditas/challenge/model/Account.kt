package com.creditas.challenge.model

data class Account(val name: String, val email: String, private val clrPassword: String) {

    val password: String by lazy { encryptPassword(clrPassword) }
    val addressBook = mutableListOf<Address>()

    private fun encryptPassword(clearTextPassword: String): String {
        TODO("encrypt password with SHA-256/512 encryption")
    }

}