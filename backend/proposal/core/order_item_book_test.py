import unittest
from unittest.mock import MagicMock
from core.order_item_book import OrderItemBook
from core.product import Product
from core.order import Order
from core.customer import Customer

class TestOrderItemBook(unittest.TestCase):
    # Testing if generate_shipping_label is called with the right methods
    def test_(self):
        order = Order(Customer("test@test.com"))
        product = Product("test name", "physical")
        # Creating OrderItemBook
        order_item_book = OrderItemBook(order, product)
        # Mocking generate_shipping_label function
        order_item_book.generate_shipping_label = MagicMock()
        order_item_book.dispatch()
        # Checking if generate shipping label was called with a additional
        order_item_book.generate_shipping_label.assert_called_once_with("Duty Free")
    
if __name__ == "__main__":
    unittest.main()
