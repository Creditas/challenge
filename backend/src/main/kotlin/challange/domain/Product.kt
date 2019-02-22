package main.challenge.domain

data class Product(val name: String, val type: ProductType, val price: Double)

enum class ProductType {
    PHYSICAL,
    BOOK,
    DIGITAL,
    MEMBERSHIP
}

@Throws(Exception::class)
fun ProductType.createOrderItemProcessorFromProductType() =
    when (this) {
        ProductType.PHYSICAL -> PhysicalItemProcessingStrategy()
        ProductType.BOOK -> BookItemProcessingStrategy()
        ProductType.DIGITAL -> DigitalItemProcessingStrategy()
        ProductType.MEMBERSHIP -> MembershipItemProcessingStrategy()
    }