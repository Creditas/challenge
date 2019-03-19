import unittest
import time
from core.order_item import OrderItem
from core.product import Product
from core.order import Order
from core.customer import Customer
from core.address import Address

class TestOrderItem(unittest.TestCase):
    # Testing if Invoice 
    def test_creation(self):
        customer = Customer()
        address = Address("01420001")
        order = Order(customer, { "address": address })
        self.assertEqual(order.customer, customer)
        self.assertEqual(order.items, [])
        self.assertEqual(order.address, address)
    
    def test_add_product(self):
        product = Product("test name", "book")
        order = Order(Customer())
        # Adding product
        order.add_product(product)
        # Testing if product was added
        self.assertEqual(order.items[0].product, product)
    
    def test_total_amount(self):
        product1 = Product("test name 1", "book")
        product2 = Product("test name 2", "book")
        order = Order(Customer())
        order.add_product(product1)
        order.add_product(product2)
        # Testing total amount of two product is 20 (10 + 10)
        self.assertEqual(order.total_amount(), 20)

    def test_close(self):
        order = Order(Customer())
        # Closing order
        now_time = time.time()
        order.close(now_time)
        # Checking if it was closed
        self.assertEqual(order.closed_at, now_time)



if __name__ == "__main__":
    unittest.main()
