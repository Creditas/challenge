package challenge.infrastructure.repositories.business

import challenge.infrastructure.resources.financial.types.ProductType

open class Product(val name: String, val type: ProductType, val price: Double)