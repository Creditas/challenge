import unittest
from unittest.mock import Mock, patch

from backend.bootstrap import ShipService, Customer, Order, Product, ProductClassification, Membership


class ShippingTest(unittest.TestCase):

    def test_should_print_shipping_label(self):
        order = Mock(Order(Customer("blah")))
        shipping_label = ShipService.print_shipping_label(order)

        self.assertEqual(shipping_label, "printed")

    def test_should_send_notification_to_the_user(self):
        customer = Customer("fulano@email.com")
        customer_email = ShipService.send_notification(customer.email, "message")

        self.assertEqual(customer_email, "message returned")


class MemberShipTest(unittest.TestCase):

    def test_should_activate_an_specific_membership(self):
        customer = Customer("fulano@email.com")
        membership = Membership(customer)

        membership.activate()
        status = membership.status()

        self.assertEqual(status, True)

    def test_should_deactivate_an_specific_membership(self):
        customer = Customer("fulano@email.com")
        membership = Membership(customer)

        membership.deactivate()
        status = membership.status()

        self.assertEqual(status, False)