package org.example.models.impl

import org.example.dtos.Voucher
import org.example.dtos.Customer
import org.example.models.DigitalPurchase
import org.example.models.SendEmail

class DigitalPurchaseImpl(
    val emailSender : SendEmail
): DigitalPurchase {
    override fun sendMailWithVoucher(customer: Customer): String{
        emailSender.sendEmail(
            customer.email,
            defaultVaucher
        )

        return "The customer received a email with voucher"
    }

    companion object{
        private val defaultVaucher = Voucher(
            discountE4 = 1000
        )
    }
}