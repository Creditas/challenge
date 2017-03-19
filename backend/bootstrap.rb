Dir["#{Dir.pwd}/lib/**/*.rb"].each {|file| require file }

# Book Example (build new payments if you need to properly test it)
address = Address.new(zipcode: '00000-000')
foolano = Customer.new(name: 'customer', email: 'customer@email.com', address: address)
order = Order.new(foolano)
physical = Product.new('Awesome physical', :physical, 15)
order.add_product(physical)
book = Product.new('Awesome book', :book)
order.add_product(book, 5)
digital1 = Product.new('Awesome music', :digital)
order.add_product(digital1)
digital2 = Product.new('Awesome video', :digital, 30)
order.add_product(digital2)
membership = Product.new('Awesome membership', :membership)
order.add_product(membership)

payment_book = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay

p payment_book.paid?
p payment_book.order.items.map { |item| item.type }.uniq
p order.amount
