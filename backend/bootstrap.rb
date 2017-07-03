$LOAD_PATH.unshift('.')
files = Dir['*.rb']
files.delete('bootstrap.rb')
files.each { |file| require file }

foolano = Customer.new(name: 'Phelipe')
book = Book.new(name: 'Awesome book')
book_order = Order.new(foolano)
book_order.add_product(book)
book_membership = Membership.new(name: 'Monthly Book Club')
book_order.add_product(book_membership)
new_movie = Movie.new(name: 'The Void')
book_order.add_product(new_movie)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
p payment_book.paid?
p payment_book.order.items.first.product
