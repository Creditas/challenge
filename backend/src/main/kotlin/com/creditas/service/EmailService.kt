package com.creditas.service

// This class is responsible to fill the template with passed parameters and send the email
class EmailService {

    fun sendEmail(emailTo: String, emailTemplate : String, parameters : Map<String, String>) {
        println("Email ${emailTemplate} sent!")
    }
}