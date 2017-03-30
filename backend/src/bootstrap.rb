require_relative './models/customer'
require_relative './models/product'
require_relative './models/order'
require_relative './models/address'
require_relative './models/payment_methods/credit_card'

customer = Customer.new name: 'Daniel', email: 'danielgatis@gmail.com'

product1 = Product.new name: 'Awesome Book', price: 10, type: :book
product2 = Product.new name: 'Awesome Digital', price: 5, type: :digital
product3 = Product.new name: 'Awesome Physical', price: 5, type: :physical
product4 = Product.new name: 'Awesome Membership', price: 5, type: :membership

order = Order.new customer: customer,
                  billing_address: Address.new(zipcode: '52100'),
                  shipping_address: Address.new(zipcode: '52100')

order.add_product product1, 2
order.add_product product2, 2
order.add_product product3, 2
order.add_product product4, 2

invoices =  order.pay! CreditCard.fetch_by_hashed('43567890-987654367')
