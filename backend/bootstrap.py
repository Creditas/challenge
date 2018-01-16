import time
import uuid
import unittest


class Payment:
    authorization_number = None
    amount = None
    invoice = None
    order = None
    payment_method = None
    paid_at = None

    def __init__(self, attributes={}):
        self.authorization_number = attributes.get('attributes', None)
        self.amount = attributes.get('amount', None)
        self.invoice = attributes.get('invoice', None)
        self.order = attributes.get('order', None)
        self.payment_method = attributes.get('payment_method', None)

    def pay(self, paid_at=time.time()):
        self.amount = self.order.total_amount()
        if self.amount == 0:
            return "Invalid payment. The order has no products"
        self.authorization_number = int(time.time())
        attributes = dict(
            billing_address=self.order.address,
            shipping_address=self.order.address,
            order=self.order
        )
        self.invoice = Invoice(attributes=attributes)
        self.paid_at = paid_at
        self.order.close(self)
        return True

    def is_paid(self):
        return self.paid_at is not None


class Invoice:
    billing_address = None
    shipping_address = None
    order = None

    def __init__(self, attributes={}):
        self.billing_address = attributes.get('billing_address', None)
        self.shipping_address = attributes.get('shipping_address', None)
        self.order = attributes.get('order', None)


class Order:
    customer = None
    items = None
    payment = None
    address = None
    closed_at = None
    dispatch = {}

    def __init__(self, customer, attributes={}):
        self.customer = customer
        self.items = []
        self.order_item_class = attributes.get('order_item_class', OrderItem)
        self.address = attributes.get('address', Address(zipcode='45678-979'))

    def add_product(self, product):
        if product.type not in ProductTypes.valid_types:
            return 'Invalid product type'
        self.items.append(self.order_item_class(order=self, product=product))

    def total_amount(self):
        total = 0
        for item in self.items:
            total += item.total()

        return total

    def close(self, payment):
        self.closed_at = time.time()
        if payment.is_paid():
            OrderDispatch(self)

    # remember: you can create new methods inside those classes to help you create a better design


class OrderItem:
    order = None
    product = None

    def __init__(self, order, product):
        self.order = order
        self.product = product

    def total(self):
        return 10


class Product:
    # use type to distinguish each kind of product: physical, book, digital, subscription, etc.
    name = None
    type = None

    def __init__(self, name, type):
        self.name = name
        self.type = type


class Address:
    zipcode = None

    def __init__(self, zipcode):
        self.zipcode = zipcode


class CreditCard:

    @staticmethod
    def fetch_by_hashed(code):
        return CreditCard()


class Customer:
    name = None
    email = None

    def __init__(self, name, email=None):
        self.name = name
        self.email = email


class Subscription:
    order = None
    activated = False

    def __init__(self, order):
        self.order = order

    def activate(self):
        self.activated = True
        self.message = "Subscription for customer {} activated".format(
            self.order.customer.name
        )


class Voucher:
    order = None
    code = None

    def __init__(self, order):
        self.order = order
        self.code = uuid.uuid4().hex[4:10]

    def process(self):
        self.message = "Voucher #{} generated for customer {}".format(
            self.code, self.order.customer.name
        )


class ShippingLabel:
    label = False
    free_tax = False
    order = None

    def __init__(self, order, free_tax=False):
        self.free_tax = free_tax
        self.order = order

    def print_label(self):
        self.message = "Shipping label for customer {}{}".format(
            self.order.customer.name,
            " with free tax (Art. 150, VI, d. for Constitution)" if self.free_tax else ""
        )


class Notification:
    sent = False
    order = None

    def __init__(self, order):
        self.order = order

    def send(self):
        self.sent = True
        self.message = "Notification sent to {}".format(self.order.customer.name)


class OrderDispatch:
    order = None

    def __init__(self, order):
        self.order = order
        method = getattr(self, "process_{}_item".format(order.items[0].product.type), None)
        if method:
            method()

    def process_physical_item(self):
        shipping = ShippingLabel(self.order)
        shipping.print_label()
        self.order.dispatch = dict(shipping=shipping)

    def process_book_item(self):
        shipping = ShippingLabel(self.order, free_tax=True)
        shipping.print_label()
        self.order.dispatch = dict(shipping=shipping)

    def process_subscription_item(self):
        notification = Notification(self.order)
        notification.send()
        subscription = Subscription(self.order)
        subscription.activate()
        self.order.dispatch = dict(
            notification=notification,
            subscription=subscription
        )

    def process_digital_item(self):
        notification = Notification(self.order)
        notification.send()
        voucher = Voucher(self.order)
        voucher.process()
        self.order.dispatch = dict(
            notification=notification,
            voucher=voucher
        )


class ProductTypes:
    valid_types = ['physical', 'book', 'digital', 'subscription']


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
        payment.pay()
        self.assertEqual(payment.is_paid(), True)

    def test_physical_product(self):
        self.order.add_product(self.physical_item)
        payment = Payment({"order": self.order, "payment_method": self.credit_card})
        payment.pay()
        dispatch = self.order.dispatch.get('shipping')
        self.assertEqual(type(dispatch), ShippingLabel)
        self.assertEqual(dispatch.message, "Shipping label for customer {}".format(self.customer.name))
        self.assertEqual(dispatch.free_tax, False)
        self.assertEqual(self.order.dispatch.get('notification'), None)
        self.assertEqual(self.order.dispatch.get('subscription'), None)
        self.assertEqual(self.order.dispatch.get('voucher'), None)

    def test_book_product(self):
        self.order.add_product(self.book)
        payment = Payment({"order": self.order, "payment_method": self.credit_card})
        payment.pay()
        shipping = self.order.dispatch.get('shipping')
        self.assertEqual(type(shipping), ShippingLabel)
        self.assertEqual(
            shipping.message,
            "Shipping label for customer {} with free tax (Art. 150, VI, d. for Constitution)".format(self.customer.name)
        )
        self.assertEqual(shipping.free_tax, True)
        self.assertEqual(self.order.dispatch.get('notification'), None)
        self.assertEqual(self.order.dispatch.get('subscription'), None)
        self.assertEqual(self.order.dispatch.get('voucher'), None)

    def test_subscription_product(self):
        self.order.add_product(self.subscription)
        payment = Payment({"order": self.order, "payment_method": self.credit_card})
        payment.pay()
        notification = self.order.dispatch.get('notification')
        subscription = self.order.dispatch.get('subscription')
        self.assertEqual(type(notification), Notification)
        self.assertEqual(type(subscription), Subscription)
        self.assertEqual(notification.message, "Notification sent to {}".format(self.customer.name))
        self.assertEqual(notification.sent, True)
        self.assertEqual(subscription.message, "Subscription for customer {} activated".format(self.customer.name))
        self.assertEqual(subscription.activated, True)
        self.assertEqual(self.order.dispatch.get('shipping'), None)
        self.assertEqual(self.order.dispatch.get('voucher'), None)

    def test_digital_product(self):
        self.order.add_product(self.digital_item)
        payment = Payment({"order": self.order, "payment_method": self.credit_card})
        payment.pay()
        notification = self.order.dispatch.get('notification')
        voucher = self.order.dispatch.get('voucher')
        self.assertEqual(type(notification), Notification)
        self.assertEqual(type(voucher), Voucher)
        self.assertEqual(notification.message, "Notification sent to {}".format(self.customer.name))
        self.assertEqual(notification.sent, True)
        self.assertEqual(
            voucher.message,
            "Voucher #{} generated for customer {}".format(voucher.code, self.customer.name)
        )
        self.assertEqual(self.order.dispatch.get('shipping'), None)
        self.assertEqual(self.order.dispatch.get('subscription'), None)

    def test_wrong_product_type(self):
        self.assertEqual(self.order.add_product(self.wrong_type), "Invalid product type")

    def test_order_with_no_products(self):
        payment = Payment({"order": self.order, "payment_method": self.credit_card})
        self.assertEqual(payment.pay(), "Invalid payment. The order has no products")


if __name__ == '__main__':
    unittest.main()
