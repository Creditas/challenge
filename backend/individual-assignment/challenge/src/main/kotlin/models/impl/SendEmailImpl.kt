package org.example.models.impl

import org.example.dtos.Voucher
import org.example.models.SendEmail

class SendEmailImpl: SendEmail {
    override fun sendEmail(
        email: String,
        voucher: Voucher?
    ): String {
        println("Method that will make email body, with whatever tool")
        return "Method that will make email body, with whatever tool"
    }
}