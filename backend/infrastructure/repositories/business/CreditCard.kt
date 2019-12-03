package challenge.infrastructure.repositories.business

import challenge.infrastructure.repositories.payment.PaymentMethod

data class CreditCard(val number: String) : PaymentMethod