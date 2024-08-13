package challenge.domain.interfaces

import challenge.domain.entities.Order

interface OrderValidator {
    fun validate(order: Order) {
    }
}