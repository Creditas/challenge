require 'require_all'
require_all 'lib'

beltrano = Customer.new(name: 'Beltrano', email: 'beltrano.silva@creditas.com.br')
xbox = Product.new(name: 'Console Xbox One', price: 1820.00,type: :physical)
digital = Product.new(name: 'Music: The Unforgiven - Metallica', price: 18.00, type: :digital)
membership = Product.new(name: 'Monthly Internet 100MB', price: 87.90,type: :membership)
book = Product.new(name: 'Domain-Driven Design: Tackling Complexity in the Heart of Software', price: 58.00, type: :book)


order = Order.new(beltrano)
order.add_billing_address(Address.new(street: 'Rua bento Salves' ,zipcode: '45678-979'))
order.add_shipping_address(Address.new(street: 'Rua Marques de Lages', zipcode: '04162-001'))
order.add_product(xbox)
order.add_product(membership)
order.add_product(digital)
order.add_product(book)

payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment.pay

if payment.paid?
  orderProcessing = OrderProcessing.new(order)
  orderProcessing.process
end