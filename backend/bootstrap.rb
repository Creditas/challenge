require_relative 'lib/config/load'

# Book Example (build new payments if you need to properly test it)
foolano = Customer.new( 'Foolano')
book = Product.new(name: 'Awesome book', type: :book)
physical = Product.new(name: 'Notebook', type: :physical)
digital = Product.new(name: 'Audio Book', type: :digital)
membership = Product.new(name: 'Subscription Book', type: :membership)
book_order = Order.new(foolano)
book_order.add_product(book)
book_order.add_product(physical)
book_order.add_product(digital)
book_order.add_product(membership)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay