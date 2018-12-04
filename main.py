from customer import Customer
from payment import Payment, CARD, BANK_TRANSFER


customer = Customer('customer-id')
order = customer.get_order(products=['product-id-1', 'product-id-2', 'product-id-3'])
payment = Payment.create({'order': order})
payment.pay(CARD)
