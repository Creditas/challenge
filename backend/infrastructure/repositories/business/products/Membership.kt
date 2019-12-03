package challenge.infrastructure.repositories.business.products

import challenge.infrastructure.repositories.business.Product
import challenge.infrastructure.resources.financial.types.ProductType

class Membership (name: String, price: Double) : Product(name, ProductType.MEMBERSHIP, price)