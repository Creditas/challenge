# coding: utf-8
import time
from datetime import datetime, timedelta

import const


def print_shipping_label(label):
    # Do some magic to print label
    pass


def send_email(email):
    if email:
        # Do some black magic to deliver the email
        pass


class Payment(object):

    def __init__(self, order, payment_method):
        self.order = order
        self.payment_method = payment_method
        self.paid_at = None

    def pay(self, paid_at=None):
        self.paid_at = paid_at or time.time()

        self.authorization_number = int(time.time())

        self.create_invoice()
        self.order.close(self.paid_at)

    def create_invoice(self):
        return self.invoice = Invoice(**dict(
            payment=self,
            billing_address=self.order.address,
            amount=self.amount,
        ))

    @property
    def amount(self):
        return self.order and self.order.total_amount

    @property
    def is_paid(self):
        return self.paid_at != None


class Invoice(object):

    def __init__(self, payment, billing_address, amount):
        self.payment = payment
        self.billing_address = billing_address
        self.amount = amount

    def create_entries(self):
        self.payment.payment_method.create_entries(self.amount)


class Order:

    def __init__(self, customer):
        self.customer = customer
        self.address = self.customer.shipping_address
        self.shipment = Shipment(address=self.customer.shipping_address)
        self.items = []

    def add_product(self, product):
        self.items.append(product)
        return self

    @property
    def total_amount(self):
        return sum(item.price for item in self.items)

    def _trigger_products_after_checkout(self):
        [item.on_checkout(self) for item in self.items]

    def close(self, closed_at=None):
        self.closed_at = closed_at or time.time()
        self._trigger_products_after_checkout()
        return self.closed_at


class Product(object):
    type = None

    def __init__(self, name, price):
        if self.type not in const.PRODUCT_CHOICES:
            raise RunTimeError('Type must be one of {}'.format(','.join(const.PRODUCT_CHOICES)))

        self.name = name
        self.type = type
        self.price = price

    def on_checkout(self, order):
        pass


class Membership(Product):
    type = const.PRODUCT_TYPE_MEMBERSHIP
    expiration = None

    def on_checkout(self, order):
        self._activate_plan(order.customer)
        send_email(order.customer.email)

    def _activate_plan(self, customer):
        # With DB we can add some validations with customer's info
        self.expiration = datetime.now() + timedelta(days=30)
        return self.expiration


class Physical(Product):
    type = const.PRODUCT_TYPE_PHYSICAL
    shipping_label = const.PHYSICAL_SHIPPING_LABEL

    def on_checkout(self, order):
        order.shipment.product_to_ship.append(self)
        print_shipping_label(self.shipping_label)


class Book(Physical):
    type = const.PRODUCT_TYPE_BOOK
    shipping_label = const.BOOK_SHIPPING_LABEL


class Digital(Product):
    type = const.PRODUCT_TYPE_DIGITAL
    
    def on_checkout(self, order):
        send_email(order.customer.email, const.VOUCHER)


class Address(object):

    def __init__(self, zipcode):
        self.zipcode = zipcode


class PaymentMethod(object):

    def create_entries(self, amount):
        self.amount = amount


class CreditCard(PaymentMethod):
    pass


class BankSlip(PaymentMethod):
    pass


class Customer(object):

    def __init__(self, first_name, last_name, phone, email,
                 billing_address, shipping_address=None):

        self.first_name = first_name
        self.last_name = last_name
        self.phone = phone
        self.email = email
        self.billing_address = billing_address
        self.shipping_address = shipping_address or self.billing_address


class Shipment(object):

    def __init__(self, address):
        self.address = address
        self.product_to_ship = []

    def ship_product(self):
        if all(self.address, self.product_to_ship):
            # Issue product package info and customer address
            # info to logistics. :D
