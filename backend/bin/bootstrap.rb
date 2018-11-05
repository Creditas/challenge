require './lib/challenge' 

address = Address.new(zipcode: '45678-979')
customer = Customer.new(address, address, 'customer@email.com')

shirt = Product.new(name: 'Flowered t-shirt', type: :physical, price: 35.00)
netflix = Product.new(name: 'Familiar plan', type: :membership, price: 29.90)
book = Product.new(name: 'The Hitchhiker''s Guide to the Galaxy', type: :book, price: 120.00)
music = Product.new(name: 'Stairway to Heaven', type: :digital, price: 5.00)

order = Order.new(customer)
order.add_product(shirt, 2)
order.add_product(netflix, 1)
order.add_product(book, 1)
order.add_product(music, 1)

payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

dispatcher = Dispatcher.new(payment)
dispatcher.add_dispatcher(BookShippingDispatcher.new)
dispatcher.add_dispatcher(RegularShippingDispatcher.new)
dispatcher.add_dispatcher(MembershipDispatcher.new)

payment.pay

p payment.paid? # < true
p payment.order.items.first.product.type