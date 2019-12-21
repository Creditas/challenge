require 'require_all'

require_all 'lib'
require_all 'infrastructure'

customer = ::Domain::Customer.new(name: 'Lucas', email: 'lucas@creditas.com.br', address: ::Domain::Address.new(zipcode: '02802120'))
order = ::Domain::Order.new(customer)
physical_product = ::Domain::Product.new(name: 'Bacon', type: 'physical', price: 10)
book_product = ::Domain::Product.new(name: 'Book About Bacon', type: 'book', price: 5)
membership_product = ::Domain::Product.new(name: 'Bacon Lovers', type: 'membership', price: 15)
digital_product = ::Domain::Product.new(name: 'Virtual Bacon', type: 'digital', price: 20)

order.add_product(book_product)
order.add_product(physical_product)
order.add_product(membership_product)
order.add_product(digital_product)
