package challenge.infrastructure.repositories.business.products

import challenge.infrastructure.repositories.business.Product
import challenge.infrastructure.resources.financial.types.ProductType

class Physical (name: String, price: Double) : Product(name, ProductType.PHYSICAL, price)