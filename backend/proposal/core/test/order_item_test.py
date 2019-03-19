import unittest
from core.order_item import OrderItem
from core.product import Product
from core.order import Order
from core.customer import Customer

class TestOrderItem(unittest.TestCase):
    # Testing if Invoice 
    def test_creation(self):
        order = Order(Customer())
        product = Product("test name", "book")
        order_item = OrderItem(order, product)
        self.assertEqual(order_item.order, order)
        self.assertEqual(order_item.product, product)
    
if __name__ == "__main__":
    unittest.main()
