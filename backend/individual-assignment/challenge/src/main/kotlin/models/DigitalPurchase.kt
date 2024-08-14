package org.example.models

import org.example.dtos.Customer

interface DigitalPurchase{
    fun sendMailWithVoucher(customer: Customer): String
}