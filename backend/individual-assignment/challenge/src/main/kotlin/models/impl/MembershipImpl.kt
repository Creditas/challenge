package org.example.models.impl

import org.example.dtos.Voucher
import org.example.dtos.Customer
import org.example.models.Membership
import org.example.models.SendEmail

class MembershipImpl(
    val emailSender : SendEmail
): Membership {

    override fun activateMembership(customer: Customer): String {
        if(customer.isMember) {
            println("The member is already a member, the expirationDate will be increased")
            return "The member is already a member, the expirationDate will be increased"
        } else {
            println("The client will have his membership activated")
            emailSender.sendEmail(
                email = customer.email
            )

            return "The Customer is now a member"
        }
    }
}