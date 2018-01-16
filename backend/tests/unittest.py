import unittest

from backend.bootstrap import Customer, Product, Order, Payment, CreditCard


class TestPayment(unittest.TestCase):

    def setUp(self):
        self.customer = Customer(name='Fulano', email='fulano@domain.com')
        self.book = Product(name='Awesome book', type='book')
        self.subscription = Product(name='Netflix', type='subscription')
        self.physical_item = Product(name='Iphone 10', type='physical')
        self.digital_item = Product(name='Linkin Park Album', type='digital')
        self.wrong_type = Product(name='This is bad', type='unknow')
        self.order = Order(self.customer)
        self.credit_card = CreditCard.fetch_by_hashed('43567890-987654367')

    def test_is_paid(self):
        self.order.add_product(self.book)
        payment = Payment({"order": self.order, "payment_method": self.credit_card})
        self.assetEqual(payment.pay(), True)
