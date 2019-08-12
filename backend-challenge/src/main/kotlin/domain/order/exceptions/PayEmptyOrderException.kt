package domain.order.exceptions

import java.lang.Exception

class PayEmptyOrderException(override val message: String?) : Exception(message)
