import time
import random
import string

class Payment:
    paymentId = None
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
        self.paymentId = "".join(random.choices(string.digits, k=10))
        
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
    ship_messages = None

    def __init__(self, customer, attributes={}):
        self.customer = customer
        self.items = []
        self.ship_messages = []
        self.order_item_class = attributes.get('order_item_class', OrderItem)
        self.address = attributes.get('address', Address(zipcode='45678-979'))
        
    def add_product(self, product):
        self.items.append(self.order_item_class(order=self, product=product))

    def total_amount(self):
        total = 0
        for item in self.items:
            total += item.product.value

        return total

    def close(self, closed_at=time.time()):
        self.closed_at = closed_at

    def generateShippingLabel(self, item, notification=None):
        
        # Random Shipping Label
        shippingLabel = "".join(random.choices(string.ascii_uppercase + string.digits, k=10))
        notif = 'Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.'

        result = "Shipping Label for "+item.product.name+": "+shippingLabel
        result = result + " - " + notif if notification else result
        
        return result

    def sendUserMail(self, type):
        return 'E-mail of ' + type + ' sended to ' + self.customer.email

    def applyDiscount(self, payment):

        discount = Discount({'payment':payment.paymentId, 'value':'10.00'})

        self.customer.vouchers.append(discount)
        

        return 'New $ 10.00 voucher added, linked to payment '+payment.paymentId 

    def ship(self, payment):

        membership = Membership(self.customer)
            
        for item in self.items:
            
            productType = item.product.type

            if productType == 'book' :
                self.ship_messages.append(self.generateShippingLabel(item, True))
            elif productType == 'membership' :
                self.ship_messages.append(membership.activateMembership(item))
                self.ship_messages.append(self.sendUserMail('new membership'))
            elif productType == 'physical' :
                self.ship_messages.append(self.generateShippingLabel(item))
            elif productType == 'digital' :
                self.ship_messages.append(self.applyDiscount(payment))
                self.ship_messages.append(self.sendUserMail('purchase information'))

class OrderItem:
    order = None
    product = None

    def __init__(self, order, product):
        self.order = order
        self.product = product

    def total(self):
        return self.product.value

class Discount:
    payment = None
    value = None

    def __init__(self, attributes={}):
        self.payment = attributes.get('payment', None)
        self.value = attributes.get('value', None)

class Product:
    name = None
    type = None
    value = None

    def __init__(self, name, type, value):
        self.name = name
        self.type = type
        self.value = value

class Address:
    zipcode = None

    def __init__(self, zipcode):
        self.zipcode = zipcode


class CreditCard:

    @staticmethod
    def fetch_by_hashed(code):
        return CreditCard()

class Customer:

    #Personal Identification Number
    pin = None

    name = None
    email = None
    vouchers = None

    def __init__(self, attributes={}):
        self.pin = attributes.get('pin', None)
        self.name = attributes.get('name', None)
        self.email = attributes.get('email', None)
        self.vouchers = []

class Membership:

    customer = None
    activatedMemberships = None

    def __init__(self, customer, attributes={}):
        self.customer = customer
        self.activatedMemberships = []

    def activateMembership(self, item):
        # Activate Membership for Customer
        self.activatedMemberships.append(item.product.name)
        
        result = "New membership added for customer " + self.customer.name + "\n"
        result += "Activated Memberships: " + ','.join(self.activatedMemberships)
        
        return result 