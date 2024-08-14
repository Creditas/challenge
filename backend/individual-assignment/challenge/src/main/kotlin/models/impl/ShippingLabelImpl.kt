package org.example.models.impl

import org.example.enums.Taxes
import org.example.dtos.Address
import org.example.dtos.Customer
import org.example.models.ShippingLabel

class ShippingLabelImpl: ShippingLabel {
    override fun ship(
        customer: Customer,
        address: Address,
        exemptTaxes: List<Taxes>
    ): String {
        if(exemptTaxes.isEmpty()){
            println("The object was shipped with taxes")
            return "The object was shipped with taxes"
        } else {
            println("The object was shipped with NO taxes")
            return "The object was shipped with NO taxes"
        }
    }
}