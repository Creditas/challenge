package challenge.infrastructure.repositories.shipping

abstract class ShippingRepository {
    abstract fun generateShippingLabel(message: String)
    abstract fun generateShippingLabel(productDescription: String, message: String)
}