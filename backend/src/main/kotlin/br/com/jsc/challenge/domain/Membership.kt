package br.com.jsc.challenge.domain

class Membership(val customer: Customer) {
    var isActive: Boolean = false
        private set

    fun activate() {
        if (isActive)
            throw throw Exception("This subscription is already enabled.")

        isActive = true;
    }
}