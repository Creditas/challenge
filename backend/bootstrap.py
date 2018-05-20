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

        for item in self.order.items:
            item.shipping()
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

    def shipping(self):
        self.product.kind.ship()


class Product:
    '''
    use `kind` to distinguish each kind of product:
    physical, book, digital, membership, etc
    '''
    def __init__(self, name, kind):
        self.name = name
        self.kind = kind


class PhysicalKind:
    def ship(self):
        print('Sending for packaging')

class SignatureKind:
    def ship(self):
        print('Sending email notification')
        print('Activating Signature')

class BookKind:
    def ship(self):
        print('Sending Constituição Art. 150, VI, d notification')

class MediaKind:
    def __make_discount_voucher(self, value):
        print('R$ %s of discount granted' % value)

    def ship(self):
        print('Sending purchase description')
        print(____make_discount_voucher('10,00'))

class Address:
    def __init__(self, zipcode):
        self.zipcode = zipcode


class Customer:
    def __init__(self, name, email, shipping_address, billing_address):
        self.name = name
        self.email = email
        self.shipping_address = shipping_address
        self.billing_address = billing_address
