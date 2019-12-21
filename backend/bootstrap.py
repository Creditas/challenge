import time
from customer import Customer
from address import Address
from order import Order
from product import Product
from creditCard import CreditCard
from payment import Payment

#Customer object is created.
foolano = Customer(name='Foolano', email='foolano@foomail.com')
foolano.shipping_address = Address(zipcode='45678-979')
foolano.billing_address = Address(zipcode='45678-979')

#Order object is created.
order = Order(customer=foolano)

#Some product objects are created.
cellPhone = Product(name='fooPhone X', kind='physical', price='10000')
book = Product(name='A foo history of time', kind='book', price='50')
album = Product(name='Foo Fighters', kind='physical', price='40')
service = Product(name='Footflix', kind='service', price='15')

#Previous products are added to the order's item list.
order.add_product(cellPhone)
order.add_product(book)
order.add_product(album)
order.add_product(service)

#Payment object is created.
attributes = dict(
    order=order,
    payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
)
payment = Payment(attributes=attributes)

#Payment is issued, products are processed, invoice is generated and order is closed.
payment.pay()