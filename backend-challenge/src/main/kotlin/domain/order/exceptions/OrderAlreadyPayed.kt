package domain.order.exceptions

import java.lang.Exception

class OrderAlreadyPayed(override val message: String?) : Exception(message)
