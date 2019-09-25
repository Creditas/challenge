package com.creditas.challenge.model

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class AccountTest {

    @Test
    fun `when name is blank, throw IllegalArgEx`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            Account("", "bruno@domain.suffix", "password")
        }
        assertThat(ex.message).isEqualTo("Name cannot be blank")
    }

    @Test
    fun `when email is invalid, throw IllegalArgEx`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            Account("Bruno", "invalidEmail", "password")
        }
        assertThat(ex.message).isEqualTo("Invalid email address")
    }

    @Test
    fun `when password is blank, throw IllegalArgEx`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            Account("Bruno", "bruno@domain.suffix", "")
        }
        assertThat(ex.message).isEqualTo("Password must not be blank")
    }

}