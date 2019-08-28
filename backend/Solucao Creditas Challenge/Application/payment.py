import time
from order import OrderTotal
from invoice import Invoice
from customer import Customer
from customer import CreditCard
from customer import Address


class Payment(Customer, OrderTotal):
    authorization_number = None
    amount = None
    invoice = None
    order = None
    payment_method = None
    paid_at = None

    def __init__(self, customer, order_total):

        self.customer = customer.customerName
        self.orderTotal = order_total.totalPrice
        self.authorization_number = None
        self.amount = None
        self.invoice = None
        self.order = None
        self.payment_method = customer.fetch_by_hashed(self.customer.
                                                       creditCard)

    def pay(self, paid_at=time.time()):

        self.amount = self.orderTotal.totalPrice - self.customer.discount
        self.authorization_number = int(time.time())
        self.invoice = Invoice(self.customer, self.orderTotal, self.amount)
        self.paid_at = paid_at
        self.orderTotal.close(self.paid_at)

    def isPaid(self):
        return self.paid_at is not None
