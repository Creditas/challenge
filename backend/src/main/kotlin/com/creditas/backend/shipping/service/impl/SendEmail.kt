package com.creditas.backend.shipping.service.impl

class SendEmail {

    fun send(emailAddress: String, subject: String, message: String) {
        println("Sending email to ${emailAddress}... ${subject}. ${message}")
    }
}