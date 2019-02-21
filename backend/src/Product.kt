package challenge

data class Product(val name: String, val type: ProductType, val price: Double)

enum class ProductType {
    PHYSICAL,
    BOOK,
    DIGITAL,
    MEMBERSHIP
}

fun ProductType.createOrderItemProcessorFromProductType() =
    when (this) {
        ProductType.PHYSICAL -> PhysicalItemProcessingStrategy()
        ProductType.BOOK -> BookItemProcessingStrategy()
        ProductType.DIGITAL -> DigitalItemProcessingStrategy()
        ProductType.MEMBERSHIP -> MembershipItemProcessingStrategy()

        else -> throw Exception("The ProductType $this wanst registred for processing yet.")
    }