import time
from abc import ABCMeta, abstractmethod


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
        invoice_attributes = dict(
            billing_address=self.order.address,
            shipping_address=self.order.address,
            order=self.order
        )
        self.invoice = Invoice(attributes=invoice_attributes)
        self.paid_at = paid_at
        self.order.close(self.paid_at)

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
            total += item.product.price

        return total

    def close(self, closed_at=time.time()):
        self.closed_at = closed_at

    @staticmethod
    def apply_discount(price):
        return price - 10


class OrderItem:
    order = None
    product = None

    def __init__(self, order, product):
        self.order = order
        self.product = product

    def total(self):
        return self.product.price


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


class AbstractProductService(object, metaclass=ABCMeta):
    @abstractmethod
    def ship(self, product):
        pass


class BookService(AbstractProductService):
    def ship(self, product):
        ShipProcessor.print_shipping_label(
            "It is a product that doesn't have taxes, based on the constitution law Art. 150, VI", order=product.order)


class MembershipService(AbstractProductService):
    def ship(self, product):
        product.product.activate()
        ShipProcessor.send_notification("you're now a new membership!", product.order)


class PhysicalService(AbstractProductService):
    def ship(self, product):
        ShipProcessor.print_shipping_label(None, product.order)


class DigitalService(AbstractProductService):
    def ship(self, product):
        discount = product.order.apply_discount(product.product.price)
        ShipProcessor.send_notification("You have now the best product in your hands! \n"
                                        "Product: " + product.product.name +
                                        "Type: " + product.product.type +
                                        "Congratulations! You received a discount of R$ 10.00 in your order!"
                                        "New Price: " + str(discount), order=product.order)


class Product:
    name = None
    type = None
    price = None

    def __init__(self, name, type, price):
        self.name = name
        self.type = type
        self.price = price


class Book(Product):

    def __init__(self, name, price):
        super().__init__(name=name, type="book", price=price)


class Membership(Product):
    customer = None
    is_active = False

    def __init__(self, customer, price):
        self.customer = customer
        super().__init__(name="Assinatura", type="membership", price=price)

    def activate(self):
        self.is_active = True

    def deactivate(self):
        self.is_active = False

    def status(self):
        return self.is_active


class Physical(Product):
    pass


class Digital(Product):
    pass


class ShipProcessor:
    @staticmethod
    def print_shipping_label(notification, order):
        label = "Address: " + order.address.zipcode

        notification_message = ""
        if notification is not None:
            notification_message = " \nNotification: " + notification + ")"

        print("Shipping Label - " + label + notification_message)
        return "printed"

    @staticmethod
    def send_notification(message, order):
        print("send_email(" + order.customer.email + ", " + message + ")")
        return "notification sent!"


class SellService:
    customer = None
    product = None
    service = None

    def __init__(self, customer, product, service):
        self.customer = customer
        self.product = product
        self.service = service

    def sell(self):
        order = Order(self.customer)
        order.add_product(self.product)

        attributes = dict(
            order=order,
            payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
        )
        payment = Payment(attributes=attributes)
        payment.pay()

        print(payment.is_paid())  # < true
        print(payment.order.items[0].product.type)

        # now, how to deal with shipping rules then?
        self.ship_items(order)

        print("All products in the order were sent! \n")

        return True

    def ship_items(self, order):
        for products in order.items:
            self.service.ship(products)


if __name__ == '__main__':
    customer = Customer("fulano@email.com")

    physical = Physical(name='physical', price=100.00, type='physical')
    physical_service = PhysicalService()
    SellService(customer, physical, physical_service).sell()

    digital = Digital(name='digital', price=99.00, type='digital')
    digital_service = DigitalService()
    SellService(customer, digital, digital_service).sell()

    digital_book = Book(name='Digital book', price=149.90)
    book_service = BookService()
    SellService(customer, digital_book, book_service).sell()

    membership = Membership(customer, price=58.70)
    membership_service = MembershipService()
    SellService(customer, membership, membership_service).sell()
