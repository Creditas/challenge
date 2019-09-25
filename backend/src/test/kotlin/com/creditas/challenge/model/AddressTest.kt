package com.creditas.challenge.model

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class AddressTest {

    @Test
    fun `should build a valid address`() {
        val address = Address.Builder()
            .country("Brazil ")
            .streetAddress("Av Paulista, 1000 ")
            .postalCode("01000-000")
            .state("SP ")
            .city(" Sao Paulo ")
            .build()

        Assertions.assertThat(address.city).isEqualTo("Sao Paulo")
        Assertions.assertThat(address.state).isEqualTo("SP")
        Assertions.assertThat(address.country).isEqualTo("Brazil")
        Assertions.assertThat(address.streetAddress).isEqualTo("Av Paulista, 1000")
        Assertions.assertThat(address.postalCode).isEqualTo("01000-000")
    }

    @Test
    fun `when country is blank, throw IllegalArgEx`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            Address.Builder()
                .country("")
                .streetAddress("Av Paulista, 1000 ")
                .postalCode(" 01000-000")
                .state("SP ")
                .city(" Sao Paulo ")
                .build()
        }
        Assertions.assertThat(ex.message).isEqualTo("Country cannot be empty")
    }

    @Test
    fun `when streetName is blank, throw IllegalArgEx`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            Address.Builder()
                .country("Brazil ")
                .streetAddress("")
                .postalCode(" 01000-000")
                .state("SP ")
                .city(" Sao Paulo ")
                .build()
        }
        Assertions.assertThat(ex.message).isEqualTo("Street address cannot be empty")
    }

    @Test
    fun `when postalCode is blank, throw IllegalArgEx`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            Address.Builder()
                .country("Brazil ")
                .streetAddress("Av Paulista, 1000 ")
                .postalCode("")
                .state("SP ")
                .city(" Sao Paulo ")
                .build()
        }
        Assertions.assertThat(ex.message).isEqualTo("Postal code cannot be empty")
    }


    @Test
    fun `when state is blank, throw IllegalArgEx`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            Address.Builder()
                .country("Brazil ")
                .streetAddress("Av Paulista, 1000 ")
                .postalCode(" 01000-000")
                .state("")
                .city(" Sao Paulo ")
                .build()
        }
        Assertions.assertThat(ex.message).isEqualTo("State cannot be empty")
    }

    @Test
    fun `when city is blank, throw IllegalArgEx`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            Address.Builder()
                .country("Brazil ")
                .streetAddress("Av Paulista, 1000 ")
                .postalCode(" 01000-000")
                .city("")
                .state("SP ")
                .build()
        }
        Assertions.assertThat(ex.message).isEqualTo("City cannot be empty")
    }

    @Test
    fun `when any of the properties are missing, throw UninitializedPropertyAccessEx`() {
        assertThrows(UninitializedPropertyAccessException::class.java) {
            Address.Builder()
                .country("Brazil ")
                .city("Sao Paulo")
                .state("SP ")
                .build()
        }
    }

}