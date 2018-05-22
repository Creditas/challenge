require './orders/order.rb'
require './orders/order_item.rb'
require './products/product.rb'
require './addresses/address.rb'
require './customers/customer.rb'
require './product_types/book.rb'
require './product_types/digital.rb'
require './product_types/membership.rb'
require './product_types/physical.rb'
require './payment_methods/payment.rb'
require './payment_methods/invoice.rb'
require './payment_methods/credit_card.rb'
require './payment_methods/payment_book.rb'
require './payment_methods/payment_digital.rb'
require './payment_methods/payment_membership.rb'
require './payment_methods/payment_physical.rb'


customer = Customer.new(email: 'teste@creditas.com')

# Book Example (build new payments if you need to properly test it)
book = Product.new(name: 'Awesome book', type: Book.new())
book_order = Order.new(customer)
book_order.add_product(book)
payment_book = PaymentBook.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
payment_book.shipping_label
p payment_book.paid? # < true
p payment_book.order.items.first.product.type

puts "\n"

# physical item payment Example
physical = Product.new(name: 'Caneca Darth Vader', type: Physical.new())
physical_order = Order.new(customer)
physical_order.add_product(physical)
payment_physical = PaymentPhysical.new(order: physical_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_physical.pay
payment_physical.shipping_label
p payment_physical.paid?
p payment_physical.order.items.first.product.type

puts "\n"

#digital item payment Example
digital = Product.new(name: 'Harry Potter e a Pedra Filosofal', type: Digital.new())
digital_order = Order.new(customer)
digital_order.add_product(digital)
payment_digital = PaymentDigital.new(order: digital_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_digital.pay
payment_digital.send_email
p payment_digital.paid?
p payment_digital.order.items.first.product.type

puts "\n"

membership = Product.new(name: 'Clube do vinho', type: Membership.new())
membership_order = Order.new(customer)
membership_order.add_product(membership)
payment_membership = PaymentMembership.new(order: membership_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_membership.pay
payment_membership.send_email
p payment_membership.paid?
p payment_membership.order.items.first.product.type



