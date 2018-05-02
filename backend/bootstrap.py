import time


class Payment:
    def __init__(self, order, payment_method):
        self.order = order
        self.payment_method = payment_method
        self.paid_at = None

    def pay(self):
        self.amount = self.order.total_amount
        self.authorization_number = int(time.time())
        self.paid_at = time.time()
        self.order.close()

    @property
    def is_paid(self):
        return True if self.paid_at is not None else False


class Order:
    def __init__(self, customer):
        self.customer = customer
        self.items = []
        self.closed_at = None

    def add_product(self, product, quantity):
        self.items.append(OrderItem(
                order=self,
                product=product,
                quantity=quantity
            )
        )

    @property
    def total_amount(self):
        return sum([_.quantity for _ in self.items])

    def close(self):
        self.closed_at = time.time()


class OrderItem:
    def __init__(self, order, product, quantity):
        self.order = order
        self.product = product
        self.quantity = quantity


class Product:
    '''
    use `kind` to distinguish each kind of product:
    physical, book, digital, membership, etc
    '''
    def __init__(self, name, kind):
        self.name = name
        self.kind = kind


class Address:
    def __init__(self, zipcode):
        self.zipcode = zipcode


class Customer:
    def __init__(self, name, email, shipping_address, billing_address):
        self.name = name
        self.email = email
        self.shipping_address = shipping_address
        self.billing_address = billing_address


class Shipping:
    def __init__(self, order):
        pass
# now, how to deal with shipping rules then?
