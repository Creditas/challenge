import unittest
from unittest.mock import Mock

from backend.bootstrap import Ship, Payment, Customer


class ShippingTest(unittest.TestCase):

    def test_should_print_shipping_label(self):
        payment = Mock(Payment())
        shipping_label = Ship.print_shipping_label(payment)

        self.assertEqual(shipping_label, "printed")

    def test_should_send_notification_to_the_user(self):
        customer = Customer("fulano@email.com")
        customer_email = Ship.send_notification(customer.email, "message")

        self.assertEqual(customer_email, "message returned")
