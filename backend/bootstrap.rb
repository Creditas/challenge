require_relative 'lib/product/product'
require_relative 'lib/buy/customer'
require_relative 'lib/payment_methods/credit_card'
require_relative 'lib/buy/order'
require_relative 'lib/buy/payment'

# Best fool name ever. I laugh, really. :-)
foolano = Customer.new("foolano@foo.me")
pay = CreditCard.new

a = []
a << Product.new(name: 'Awesome book', type: :digital, price: 20)
a << Product.new(name: 'Awesome book', type: :digital, price: 20)
a << Product.new(name: 'Awesome book', type: :digital, price: 20)
a << Product.new(name: 'Awesome book', type: :digital, price: 20)
a << Product.new(name: 'Awesome book', type: :membership, price: 20)
a << Product.new(name: 'Awesome book', type: :physical, price: 20)
a << Product.new(name: 'Awesome book', type: :book, price: 20)

def buy(customer, products, pay_method)
  order = Order.new(customer)
  products.each do |product|
    p product
  	order.add_product(product)
  end
  Payment.new(order, pay_method).pay
end

buy(foolano, a, pay)
p foolano.coupons
