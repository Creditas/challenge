require_relative 'models/customer'
require_relative 'models/address'
require_relative 'models/order'
require_relative 'models/product'
require_relative 'models/payment'
require_relative 'models/creditcard'

# Book Example (build new payments if you need to properly test it)
foolano = Customer.new(name: 'Luis Henrique', email: 'luis.henrique@gmail.com')

products = []
products << Product.new(name: 'Book Item', type: :book, price: 20.0)
products << Product.new(name: 'Physical Item', type: :physical, price: 30.0)
products << Product.new(name: 'Membership Item', type: :membership, price: 50.0)
products << Product.new(name: 'Digital Item', type: :digital, price: 40.0)
products << Product.new(name: 'Digital Item', type: :digital, price: 60.0)

first_order = Order.new(foolano)

products.each do |p|
  first_order.add_product(p)
end

card = CreditCard.fetch_by_hashed('43567890-987654367')

payment = Payment.new(order: first_order, payment_method: card)

payment.pay

puts "\n > Order Value: #{first_order.total_amount}"
puts "\n > Order Paid? #{payment.paid?}"
puts "\n > Memberships: #{foolano.memberships}"
puts "\n > Membership Active? #{foolano.memberships.last.active?}"
puts "\n > Customer Vouchers: #{foolano.vouchers}"
puts "\n > Total  Vouchers: #{foolano.vouchers.map(&:value).inject(:+)}"
