import unittest
from core.invoice import Invoice
from core.order import Order
from core.customer import Customer
from core.order_item import OrderItem

class TestInvoice(unittest.TestCase):
    # Testing if Invoice 
    def test_creation(self):
        order = Order(Customer())
        invoice = Invoice({
            "billing_address": "Test",
            "shipping_address": "Test 2",
            "order": order
        })
        self.assertEqual(invoice.billing_address, "Test")
        self.assertEqual(invoice.shipping_address, "Test 2")
        self.assertIsInstance(invoice.order, Order)

if __name__ == "__main__":
    unittest.main()
