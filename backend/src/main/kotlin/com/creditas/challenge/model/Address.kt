package com.creditas.challenge.model

data class Address(val country: String,
                   val streetAddress: String,
                   val city: String,
                   val state: String,
                   val postalCode: String) {

    class Builder {
        private lateinit var country: String
        private lateinit var streetAddress: String
        private lateinit var city: String
        private lateinit var state: String
        private lateinit var postalCode: String

        fun country(country: String) = apply { this.country = country.trim() }

        fun streetAddress(streetAddress: String) = apply { this.streetAddress = streetAddress.trim() }

        fun city(city: String) = apply { this.city = city.trim() }

        fun state(state: String) = apply { this.state = state.trim() }

        fun postalCode(postalCode: String) = apply { this.postalCode = postalCode.trim() }

        fun build() = Address(country, streetAddress, city, state, postalCode)
    }

}
