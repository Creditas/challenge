import unittest
from unittest.mock import MagicMock
from core.order_item_digital import OrderItemDigital
from core.product import Product
from core.order import Order
from core.customer import Customer
from core.voucher import Voucher
from services.send_email import SendEmail

class TestOrderItemDigital(unittest.TestCase):
    # Testing if generates a voucher and send a email
    def test_generate_voucher_email(self):
        customer = Customer("test@test.com")
        order = Order(customer)
        product = Product("test name", "physical")
        # Creating OrderItemDigital
        order_item_digital = OrderItemDigital(order, product)
        # Mocking __send_detailed_email function
        order_item_digital._OrderItemDigital__send_detailed_email = MagicMock()
        # Calling dispatch
        order_item_digital.dispatch()
        # Testing if a Voucher of 10 was created
        self.assertIsInstance(order_item_digital.voucher, Voucher)
        self.assertTrue(order_item_digital.voucher.value, 10)
        # Testing if called send email
        order_item_digital._OrderItemDigital__send_detailed_email.assert_called_once()
    
if __name__ == "__main__":
    unittest.main()
