require_relative "customer"
require_relative "product"
require_relative "order"
require_relative "payment"
require_relative "credit_card"
require_relative "shipping"

foolano = Customer.new(name: "Gabriel", email: "gabrieljustware@gmail.com")
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay

shipping = Shipping.new
shipping.ship(payment_book)

p payment_book.paid?
p payment_book.order.items.first.product.type

# now, how to deal with shipping rules then?
