package challenge.domain.entities

import challenge.domain.interfaces.PaymentMethod

data class CreditCard(val number: String) : PaymentMethod