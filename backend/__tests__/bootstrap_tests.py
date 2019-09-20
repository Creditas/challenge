import unittest

from backend.bootstrap import ShipProcessor, Customer, Order, Membership, Physical, PhysicalService, SellService


class SellServiceTest(unittest.TestCase):

    def test_shouldSellAProduct(self):
        customer = Customer("fulano@email.com")

        physical = Physical(name='physical', price=100.00, type='physical')
        physical_service = PhysicalService()
        selled = SellService(customer, physical, physical_service).sell()

        self.assertTrue(selled)


class OrderTest(unittest.TestCase):

    def test_shouldApplyDiscountOf10(self):
        customer = Customer("fulano@email.com")
        product = Physical(name='physical', price=100.00, type='physical')

        order = Order(customer)
        order.add_product(product)
        discount = order.apply_discount(product.price)

        self.assertEqual(discount, 90.00)

    def test_shouldCalculateTotalAmount(self):
        customer = Customer("fulano@email.com")
        product1 = Physical(name='physical', price=100.00, type='physical')
        product2 = Physical(name='physical', price=100.00, type='physical')

        order = Order(customer)
        order.add_product(product1)
        order.add_product(product2)
        amount = order.total_amount()

        self.assertEqual(amount, 200.00)


class ShippingTest(unittest.TestCase):
    customer = None
    order = None

    def setUp(self):
        self.customer = Customer("fulano@email.com")
        self.order = Order(self.customer)

    def test_should_print_shipping_label(self):
        shipping_label = ShipProcessor.print_shipping_label(None, self.order)

        self.assertEqual("printed", shipping_label)

    def test_should_send_notification_to_the_user(self):
        customer_email = ShipProcessor.send_notification("message", self.order)

        self.assertEqual("notification sent!", customer_email)


class MemberShipTest(unittest.TestCase):
    membership = None
    customer = None

    def setUp(self):
        self.customer = Customer("fulano@email.com")

        self.membership = Membership(self.customer, price=58.70)

    def test_should_activate_an_specific_membership(self):
        self.membership.activate()
        status = self.membership.status()

        self.assertEqual(True, status)

    def test_should_deactivate_an_specific_membership(self):
        self.membership.deactivate()
        status = self.membership.status()

        self.assertEqual(False, status)
