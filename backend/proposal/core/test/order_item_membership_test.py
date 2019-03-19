import unittest
from core.order_item_membership import OrderItemMembership
from core.product import Product
from core.order import Order
from core.customer import Customer
from core.membership import Membership

class TestOrderItemMembership(unittest.TestCase):
    # Testing if a membership is created and activated
    def test_membership_created(self):
        order = Order(Customer("test@test.com"))
        product = Product("test name", "physical")
        # Creating OrderItemMembership
        order_item_membership = OrderItemMembership(order, product)
        order_item_membership.dispatch()
        # Checking if it's created the membership
        self.assertIsInstance(order_item_membership.membership, Membership)
        self.assertTrue(order_item_membership.membership.activated_at != None)
    
if __name__ == "__main__":
    unittest.main()
