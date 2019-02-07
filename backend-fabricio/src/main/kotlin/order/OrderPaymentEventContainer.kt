package order

class OrderPaymentEventContainer {

    companion object {
        var events = mutableListOf<OrderPaymentEvent>()
            private set
        var hasEvents: Boolean = false
            private set

        fun addEvent(orderPaymentEvent: OrderPaymentEvent) {
            if(eventIsNotOnList(orderPaymentEvent)) {
                events.add(orderPaymentEvent)
                hasEvents = true
            }
        }

        fun handleEvents() {

            validateIfEventsIsEmpty()

            events.forEach {
                it.handle()
            }

            clearContainer()
        }

        private fun validateIfEventsIsEmpty() {
            if (events.count() == 0)
                throw Exception("There aren't events on list")
        }

        private fun eventIsNotOnList(orderPaymentEvent: OrderPaymentEvent): Boolean {
            return !events.any {
                it.eventType == orderPaymentEvent.eventType && it.order.id == orderPaymentEvent.order.id
            }
        }

        private fun clearContainer() {
            events = mutableListOf()
            hasEvents = false
        }
    }
}