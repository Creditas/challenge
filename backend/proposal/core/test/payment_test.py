import unittest
import time
from core.order_item import OrderItem
from core.product import Product
from core.order import Order
from core.customer import Customer
from core.address import Address
from core.payment import Payment
from core.invoice import Invoice

class TestOrderItem(unittest.TestCase):
    # Testing if Invoice 
    def test_creation(self):
        # Creating payment object
        customer = Customer()
        order = Order(customer)
        payment = Payment({
            "order": order,
            "payment_method": "credit_card"
        })
        # Testing if it was created correctly
        self.assertEqual(payment.order, order)
        self.assertEqual(payment.payment_method, "credit_card")

    def test_pay(self):
        # Creating payment object
        customer = Customer()
        product = Product("test name", "book")
        order = Order(customer)
        order.add_product(product)
        payment = Payment({
            "order": order,
            "payment_method": "credit_card"
        })
        # Making a payment
        now_time = time.time() 
        payment.pay(now_time)
        # Checking if the properties has been set correctly
        self.assertEqual(payment.amount, 10)
        self.assertIsInstance(payment.invoice, Invoice)
        self.assertEqual(payment.paid_at, now_time)
        self.assertEqual(payment.order.closed_at, now_time)

if __name__ == "__main__":
    unittest.main()
