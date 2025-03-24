package org.example.extension

import org.example.enums.Taxes
import org.example.models.impl.*

fun physicalProcess(
    order: Order
): String {
    if(!order.address.isValid()){
        throw Exception("Address not valid")
    }
    return ShippingLabelImpl().ship(
        address = order.address,
        customer = order.customer,
        exemptTaxes = emptyList()
    )
}

fun bookProcess(
    order: Order
): String {
    return ShippingLabelImpl().ship(
        address = order.address,
        customer = order.customer,
        exemptTaxes = listOf(Taxes.SHIP_ART_150)
    )
}

fun digitalProcess(
    order: Order
): String {
    return DigitalPurchaseImpl(
        SendEmailImpl()
    ).sendMailWithVoucher(
        order.customer
    )
}

fun membershipProcess(
    order: Order
): String {
    return MembershipImpl(
        SendEmailImpl()
    ).activateMembership(
        order.customer
    )
}