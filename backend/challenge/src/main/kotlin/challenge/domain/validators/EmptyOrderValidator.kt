package challenge.domain.validators

import challenge.domain.entities.Order
import challenge.domain.exceptions.EmptyOrderException
import challenge.domain.interfaces.OrderValidator

object EmptyOrderValidator : OrderValidator {
    override fun validate(order: Order) {
        require(order.totalAmount > 0) { throw EmptyOrderException() }
    }
}