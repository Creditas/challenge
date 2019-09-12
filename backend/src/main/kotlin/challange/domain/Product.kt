package main.challenge.domain

import main.challenge.strategies.*

data class Product(val name: String, val type: ProductType, val price: Double)

enum class ProductType {
    PHYSICAL,
    BOOK,
    DIGITAL,
    MEMBERSHIP
}

object OrderItemProcessors {

    private val processors: HashMap<ProductType, OrderItemProcessingStrategy> = HashMap<ProductType, OrderItemProcessingStrategy>()

    fun getProcessorForProductType(productType: ProductType): OrderItemProcessingStrategy {
        if (!processors.containsKey(productType)) {
            var newProcessor: OrderItemProcessingStrategy

            when (productType) {
                ProductType.PHYSICAL -> newProcessor = PhysicalItemProcessingStrategy()
                ProductType.BOOK -> newProcessor = BookItemProcessingStrategy()
                ProductType.DIGITAL -> newProcessor = DigitalItemProcessingStrategy()
                ProductType.MEMBERSHIP -> newProcessor = MembershipItemProcessingStrategy()
            }

            processors.put(productType, newProcessor)
        }

        return processors.get(productType)!!
    }
}

