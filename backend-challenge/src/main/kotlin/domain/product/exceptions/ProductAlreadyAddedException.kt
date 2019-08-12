package domain.product.exceptions

class ProductAlreadyAddedException(
        override val message: String?
) : Exception(message)