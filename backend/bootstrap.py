import time
from enum import Enum
import random
import string


class NotificationType(Enum):
	ShippingLabel = 1
	Email = 2
	AddressLabel = 3
	NoTaxLabel = 4
	ActSignature = 5
	Voucher = 6

voucherList = ['abc123', 'voucherBday', 'voucherFrequentCustomer', 'voucher1YearCustomer', 'def456']

# After payment is ok need to send a notification
class Notification:
	customer = None
	product = None
	address = None
	lstItems = []
	lst_notification_method = []
	strNotificationLabel = ''
	strNotificationEmail = ''
	
	def __init__(self, attributes):
		self.customer = attributes.get('costumer', None)
		self.product = attributes.get('product', None)
		self.address = attributes.get('address', None)
		self.lstItems = attributes.get('lstItems', None)
		
	def ClassifyNotification(self):
		if self.product.type == 'physical':
			self.lst_notification_method = {NotificationType.ShippingLabel, NotificationType.AddressLabel}
		elif self.product.type == 'digital':
			self.lst_notification_method = {NotificationType.Email, NotificationType.Voucher}
		elif self.product.type == 'membership':
			self.lst_notification_method = {NotificationType.ActSignature, NotificationType.Email}
		elif self.product.type == 'book':
			self.lst_notification_method = {NotificationType.ShippingLabel, NotificationType.AddressLabel, NotificationType.NoTaxLabel}
			
	def printLabel(self):
		# This method print a shipping label
		return 'Recipient: ' + self.customer.name + ' ZipCode: ' + self.address.zipcode + '\n'
		
	def printLabelNoTax(self):
		# This method print a shipping label with no tax
		return 'Tax-free item as provided in the Constitution  Art. 150, VI, d\n'

	def printActSignature(self):
		# This method print an email
		return 'Your signature has been activated\n'
		
	def ActivateSignature(self):
		# This methos active a signaure
		newMembership = Membership(self.customer)
		return 'Access with your email: ' + self.customer.email +' and the password: ' + newMembership.ActivatePassword()
		
	def printVoucher(self):
		# This method generate a vhoucer
		strVoucher = random.choice(voucherList)
		self.customer.voucher.append(strVoucher)
		return 'You receive a R$10,00 voucher to spend in our website! \nVoucher: ' + strVoucher +'\n'
		
	def printOrderDetails(self):
		# This methos print product details
		strLabel = ''
		for item in self.lstItems:
			strLabel = strLabel + 'Product: ' + item.product.type + ' Name: ' + item.product.name + '\n'	
		return strLabel
		
	def sendEmail(self):
		# This method send an email 
		print('Email sended: ')
		print(self.strNotificationEmail)
		
	def printShippingLabel(self):
		# This method prints a label
		print('Label printed:')
		print (self.strNotificationLabel)
							
	def defineStringNotification(self):
		for notifications in self.lst_notification_method:
			if notifications == NotificationType.AddressLabel:       # label 
				self.strNotificationLabel += self.printLabel()
			elif notifications == NotificationType.NoTaxLabel:       # no tax label
				self.strNotificationLabel += self.printLabelNoTax()
			elif notifications == NotificationType.ActSignature:     # ativar assinatura
				self.strNotificationEmail += self.printActSignature()
				self.strNotificationEmail += self.ActivateSignature()
			elif notifications == NotificationType.Voucher:          # voucher
				self.strNotificationEmail += self.printOrderDetails()
				self.strNotificationEmail += self.printVoucher()
	
	def sendNotification(self):
		# This method sends a notification regarding the product purchased
		self.ClassifyNotification()
		self.defineStringNotification()
		if NotificationType.ShippingLabel in self.lst_notification_method:
			self.printShippingLabel()
		if NotificationType.Email in self.lst_notification_method:
			self.sendEmail()

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
	name = None
	email = None
	voucher = []
	
	def __init__(self, name, email):
		self.name = name
		self.email = email


class Membership:
	customer = None
	password = None
	
	def __init__(self, customer):
		self.Customer = customer
	
	def ActivatePassword(Self):
		Self.password = random.choice(string.ascii_letters) + str(random.randint(1000,10000)) + random.choice(string.ascii_letters)
		return Self.password

if __name__ == '__main__':
	# Book Example (build new payments if you need to properly test it)
	foolano = Customer('Fuluno de Tal', 'fulano@test.com')
	order1 = Order(foolano)

	## produts list
	book = Product(name='Awesome book', type='book')
	order1.add_product(book)

	movie1 = Product(name='Movie 1', type='digital')
	order1.add_product(movie1)

	physhical1 = Product(name='Physical Item 2', type='physical')
	order1.add_product(physhical1)

	signature1 = Product(name='Signature 3', type='membership')
	order1.add_product(signature1)

	## payment
	attributes = dict(
		order=order1,
		payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
	)
	payment_order = Payment(attributes=attributes)
	payment_order.pay()
	# ~ print(payment_order.is_paid())  # < true
	# ~ print(payment_order.order.items[0].product.type)


	if payment_order.is_paid():
		## notification for each product purchased
		for oiOrderItem in payment_order.order.items:
			if oiOrderItem.product.type == 'digital':
				lstItems =  payment_order.order.items
			else:
				lstItems = []
				
			attributes = dict(
				costumer=oiOrderItem.order.customer,
				product=oiOrderItem.product,
				address=oiOrderItem.order.address,
				lstItems = lstItems
			)
			product_notification = Notification(attributes=attributes)
			product_notification.sendNotification()	
	else:
		print('Payment not completed')

	print('------------------------\n')
# now, how to deal with shipping rules then?
