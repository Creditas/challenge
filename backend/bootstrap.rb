require_relative "lib/payment"
require_relative "lib/invoice"
require_relative "lib/order"
require_relative "lib/order_item"
require_relative "lib/product"
require_relative "lib/address"
require_relative "lib/credit_card"
require_relative "lib/customer"
require_relative "lib/membership"

# Book Example (build new payments if you need to properly test it)
foolano = Customer.new
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
p payment_book.paid? # < true
p payment_book.order.items.first.product.type
p payment_book
# now, how to deal with shipping rules then?