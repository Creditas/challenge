require_relative './Entities/Customer.rb'
require_relative './Entities/Product.rb'
require_relative './Strategy/Order.rb'
require_relative './Strategy/PhysicalProductOrder.rb'
require_relative './Strategy/ServiceSubscriptionOrder.rb'
require_relative './Entities/Payment.rb'
require_relative './ValueObjects/CreditCard.rb'
require_relative './Strategy/DigitalProductOrder.rb'
   

#Book purchase example
    customer = Customer.new("João da Silva", "joao@silva.com")
    product = Product.new(name: 'Awesome book', type: :book)
    order = PhysicalProductOrder.new(customer)
    order.add_product(product)
    order.apply_payment(CreditCard.fetch_by_hashed('43567890-987654367'))
    order.post_payment
    order.close

    puts "-----------------book--------------------"
    puts order.shipping_label.message
    puts order.payment.paid?
    puts order.items.first.product.type
    puts "-----------------------------------------"

#Service subscription example

customer = Customer.new("João da Silva", "joao@silva.com")
product = Product.new(name: 'Video Streaming', type: :service)
order = ServiceSubscriptionOrder.new(customer)
order.add_product(product)
order.apply_payment(CreditCard.fetch_by_hashed('43567890-987654367'))
email = order.post_payment
order.close

puts "---------------Service-------------------"
puts order.payment.paid?
puts order.membership.subscription
puts email
puts order.items.first.product.type
puts "-----------------------------------------"

#Physical product example

customer = Customer.new("João da Silva", "joao@silva.com")
product = Product.new(name: 'Awesome CD', type: :physical)
order = PhysicalProductOrder.new(customer)
order.add_product(product)
order.apply_payment(CreditCard.fetch_by_hashed('43567890-987654367'))
order.post_payment
order.close

puts "-----------------Physical--------------------"
puts order.shipping_label.message
puts order.payment.paid?
puts order.items.first.product.type
puts "-----------------------------------------"

#Digital product example

customer = Customer.new("João da Silva", "joao@silva.com")
product = Product.new(name: 'Awesome Digital CD', type: :digital)
digital_order = DigitalProductOrder.new(customer)
digital_order.add_product(product)
digital_order.apply_payment(CreditCard.fetch_by_hashed('43567890-987654367'))
email = digital_order.post_payment
digital_order.close

puts "---------------Digital-------------------"
puts digital_order.payment.paid?
puts email
puts digital_order.items.first.product.type
puts digital_order.voucher.value
puts "-----------------------------------------"

