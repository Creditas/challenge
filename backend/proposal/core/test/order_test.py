import unittest
import time
from core.order_item_book import OrderItemBook
from core.order_item_digital import OrderItemDigital
from core.order_item_membership import OrderItemMembership
from core.order_item_physical import OrderItemPhysical
from core.product import Product
from core.order import Order
from core.customer import Customer
from core.address import Address

class TestOrder(unittest.TestCase):
    # Testing if Invoice 
    def test_creation(self):
        customer = Customer("test@test.com")
        address = Address("01420001")
        order = Order(customer, { "address": address })
        self.assertEqual(order.customer, customer)
        self.assertEqual(order.items, [])
        self.assertEqual(order.address, address)
    
    def test_add_product(self):
        product = Product("test name", Product.BOOK)
        order = Order(Customer("test@test.com"))
        # Adding product
        order.add_product(product)
        # Testing if product was added
        self.assertEqual(order.items[0].product, product)
    
    def test_total_amount(self):
        product1 = Product("test name 1", Product.BOOK)
        product2 = Product("test name 2", Product.BOOK)
        order = Order(Customer("test@test.com"))
        order.add_product(product1)
        order.add_product(product2)
        # Testing total amount of two product is 20 (10 + 10)
        self.assertEqual(order.total_amount(), 20)

    def test_close(self):
        order = Order(Customer("test@test.com"))
        # Closing order
        now_time = time.time()
        order.close(now_time)
        # Checking if it was closed
        self.assertEqual(order.closed_at, now_time)

    def test_order_item_types(self):
        # Creating products of all types
        productBook = Product("Book", Product.BOOK)
        productDigital = Product("Digital", Product.DIGITAL)
        productMembership = Product("Membership", Product.MEMBERSHIP)
        productPhysical = Product("Physical", Product.PHYSICAL)
        order = Order(Customer("test@test.com"))
        # Adding procuts to order
        order.add_product(productBook)
        order.add_product(productDigital)
        order.add_product(productMembership)
        order.add_product(productPhysical)
        # Checking OrderItems
        self.assertIsInstance(order.items[0], OrderItemBook)
        self.assertIsInstance(order.items[1], OrderItemDigital)
        self.assertIsInstance(order.items[2], OrderItemMembership)
        self.assertIsInstance(order.items[3], OrderItemPhysical)

if __name__ == "__main__":
    unittest.main()
