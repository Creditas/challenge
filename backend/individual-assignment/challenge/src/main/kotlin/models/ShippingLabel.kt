package org.example.models

import org.example.dtos.Address
import org.example.dtos.Customer
import org.example.enums.Taxes

interface ShippingLabel {
    fun ship(
        customer: Customer,
        address: Address,
        exemptTaxes: List<Taxes>
    ): String
}

