import time
from enum import Enum


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
        self.amount = self.order.total_amount
        self.authorization_number = int(time.time())
        attributes = dict(
            billing_address=self.order.address,
            shipping_address=self.order.address,
            order=self.order
        )
        self.invoice = Invoice(attributes=attributes)
        self.paid_at = paid_at
        self.order.close(self.paid_at)

    def is_paid(self):
        return self.paid_at != None


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

    def __init__(self, customer, attributes=None):
        if attributes is None:
            attributes = {}
        self.customer = customer
        self.items = []
        self.order_item_class = attributes.get('order_item_class', OrderItem)
        self.address = attributes.get('address', Address(zipcode='45678-979'))

    def add_product(self, product):
        self.items.append(self.order_item_class(order=self, product=product))

    def total_amount(self):
        total = 0
        for item in self.items:
            total += item.total

        return total

    def close(self, closed_at=time.time()):
        self.closed_at = closed_at

    # remember: you can create new methods inside those classes to help you create a better design


class OrderItem:
    order = None
    product = None

    def __init__(self, order, product):
        self.order = order
        self.product = product

    def total(self):
        return 10


class ProductClassification(Enum):
    physical = 1
    digital = 2


class Product:
    # use type to distinguish each kind of product: physical, book, digital, membership, etc.
    name = None
    type = None
    classification = None

    def __init__(self, name, type, classification):
        self.name = name
        self.type = type
        self.classification = classification


class Address:
    zipcode = None

    def __init__(self, zipcode):
        self.zipcode = zipcode


class CreditCard:

    @staticmethod
    def fetch_by_hashed(code):
        return CreditCard()


class Customer:
    email = None

    def __init__(self, email):
        self.email = email


class Membership:
    customer = None
    is_active = False

    def __init__(self, customer):
        self.customer = customer

    def activate(self):
        self.is_active = True

    def deactivate(self):
        self.is_active = False

    def status(self):
        return self.is_active


class ShipService:
    order = None

    @staticmethod
    def print_shipping_label(order):
        # get the address from the order and do something
        return "printed"

    @staticmethod
    def send_notification(email, message):
        # get the email address and the message and send the email
        return "message returned"

    def __init__(self, order):
        self.order = order

    def ship(self):
        return self.print_shipping_label(self.order)


def sell(customer, product):
    product_order = Order(customer)
    product_order.add_product(product)

    attributes = dict(
        order=product_order,
        payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
    )
    payment_book = Payment(attributes=attributes)
    payment_book.pay()

    print(payment_book.is_paid())  # < true
    print(payment_book.order.items[0].product.type)

    # now, how to deal with shipping rules then?
    service = ShipService(product_order)

    print(service.ship())


if __name__ == '__main__':
    # Book Example (build new payments if you need to properly test it)
    customer = Customer("fulano@email.com")

    book = Product(name='Awesome book', type='book', classification=ProductClassification.physical)
    sell(customer, book)

    membership = Product(name='1 year signature', type='membership', classification=ProductClassification.digital)
    sell(customer, membership)
