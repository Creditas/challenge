package challenge

import challenge.entity.BaseTest
import challenge.entity.Product
import challenge.enum.ProductType
import challenge.model.OrderItem
import org.junit.jupiter.api.Test
import kotlin.test.junit5.JUnit5Asserter

internal class OrderRulesFactoryTest : BaseTest() {

    @Test
    fun `Assert instance is ProductPhysicalRule`() {
        val orderItem = OrderItem(Product("", ProductType.PHYSICAL, 1.0), 1)
        val instance = OrderRulesFactory().getInstance(orderItem)

        JUnit5Asserter.assertNotNull(actual = instance, message = null)
        JUnit5Asserter.assertTrue(actual = instance is OrderItemRules.ProductPhysicalRule, message = null)
    }

    @Test
    fun `Assert instance is ProductBookRule`() {
        val orderItem = OrderItem(Product("", ProductType.BOOK, 1.0), 1)
        val instance = OrderRulesFactory().getInstance(orderItem)

        JUnit5Asserter.assertNotNull(actual = instance, message = null)
        JUnit5Asserter.assertTrue(actual = instance is OrderItemRules.ProductBookRule, message = null)
    }

    @Test
    fun `Assert instance is ProductDigitalRule`() {
        val orderItem = OrderItem(Product("", ProductType.DIGITAL, 1.0), 1)
        val instance = OrderRulesFactory().getInstance(orderItem)

        JUnit5Asserter.assertNotNull(actual = instance, message = null)
        JUnit5Asserter.assertTrue(actual = instance is OrderItemRules.ProductDigitalRule, message = null)
    }

    @Test
    fun `Assert instance is ProductMembershipRule`() {
        val orderItem = OrderItem(Product("", ProductType.MEMBERSHIP, 1.0), 1)
        val instance = OrderRulesFactory().getInstance(orderItem)

        JUnit5Asserter.assertNotNull(actual = instance, message = null)
        JUnit5Asserter.assertTrue(actual = instance is OrderItemRules.ProductMembershipRule, message = null)
    }

}
