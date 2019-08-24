package challenge

/**
 * I have an abstract class Product which has just the [name] and the [price]
 * These are the basic attributes that a product needs
 * You must be able [getDeliveryRule] from the product
 */
abstract class Product {
    abstract val name : String
    abstract val price : Double
    abstract fun getDeliveryRule() : DeliveryRuleInterface
}

data class DigitalProduct(override val name : String, override val price : Double) : Product() {
    override fun getDeliveryRule() : DeliveryRuleInterface {
        return DigitalDeliveryRule()
    }
}

class OrdinaryBookProduct(override val name : String, override val price : Double) : Product() {
    override fun getDeliveryRule() : DeliveryRuleInterface {
        return BookDeliveryRule("tax-exempt")
    }
}

class PhysicalProduct(override val name : String, override val price : Double) : Product() {
    override fun getDeliveryRule() : DeliveryRuleInterface {
        return PhysicalDeliveryRule()
    }
}

class Membership(override val name : String, override val price : Double) : Product() {
    override fun getDeliveryRule() : DeliveryRuleInterface {
        return MembershipDeliveryRule()
    }
}