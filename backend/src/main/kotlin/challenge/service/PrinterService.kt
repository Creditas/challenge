package challenge.service

import challenge.entity.Order
import challenge.model.OrderItem

class PrinterService private constructor() {
    companion object {
        val instance = PrinterService()
    }

    fun printLabel(order: Order, orderItem: OrderItem) {
        println("Printing order label for $orderItem")
        // add to queue
    }

    fun printTaxExceptionLabel(order: Order, orderItem: OrderItem) {
        println("Printing order label with Tax-exempt item as provided " +
                "in the Constitution Art. 150, VI, d. for $orderItem")
        // add to queue
    }
}
