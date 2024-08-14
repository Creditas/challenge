package org.example.models

import org.example.dtos.Voucher

interface SendEmail {
    fun sendEmail(
        email: String,
        voucher: Voucher? = null
    ): String
}