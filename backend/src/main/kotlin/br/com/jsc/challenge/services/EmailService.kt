package br.com.jsc.challenge.services

enum class EmailTemplate {
    MEMBERSHIP_ACTIVATION,
    TAX_FREE,
    PURCHASE_DESCRIPTION
}

class EmailService {
    fun send(emailTemplate: EmailTemplate) {
    }
}