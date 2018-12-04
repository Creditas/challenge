import time


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

    def __init__(self, customer, attributes={}):
        self.customer = customer
        self.items = []
        self.order_item_class = attributes.get('order_item_class', OrderItem)
        self.address = attributes.get('address', Address(zipcode='45678-979'))

    def add_product(self, product):
        self.items.append(self.order_item_class(order=self, product=product))

    def total_amount(self):
        total = 0
        for item in items:
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


class Product:
    # use type to distinguish each kind of product: physical, book, digital, membership, etc.
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
    # you can customize this class by yourself
    pass


class Membership:
    # you can customize this class by yourself
    pass


# Book Example (build new payments if you need to properly test it)
foolano = Customer()
book = Product(name='Awesome book', type='book')
book_order = Order(foolano)
book_order.add_product(book)

attributes = dict(
    order=book_order,
    payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
)
payment_book = Payment(attributes=attributes)
payment_book.pay()
print(payment_book.is_paid())  # < true
print(payment_book.order.items[0].product.type)

# now, how to deal with shipping rules then?
