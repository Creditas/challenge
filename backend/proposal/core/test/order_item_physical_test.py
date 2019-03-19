import unittest
from unittest.mock import MagicMock
from core.order_item_physical import OrderItemPhysical
from core.product import Product
from core.order import Order
from core.customer import Customer

class TestOrderItemPhysical(unittest.TestCase):
    # Testing if generate_shipping_label is called with the right methods
    def test_shipping_label_called(self):
        order = Order(Customer("test@test.com"))
        product = Product("test name", "physical")
        # Creating OrderItemPhysical
        order_item_physical = OrderItemPhysical(order, product)
        # Mocking generate_shipping_label function
        order_item_physical.generate_shipping_label = MagicMock()
        order_item_physical.dispatch()
        # Checking if generate shipping label was called
        order_item_physical.generate_shipping_label.assert_called_once_with()
    
if __name__ == "__main__":
    unittest.main()
