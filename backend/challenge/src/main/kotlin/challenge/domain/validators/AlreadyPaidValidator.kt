package challenge.domain.validators

import challenge.domain.entities.Order
import challenge.domain.exceptions.OrderAlreadyPaidException
import challenge.domain.interfaces.OrderValidator

object AlreadyPaidValidator : OrderValidator {
    override fun validate(order: Order) {
        require(order.payment == null) { throw OrderAlreadyPaidException() }
    }

}
