require './load'

# Book Example (build new payments if you need to properly test it)
foolano = Customer.new(name: "Zachery Tissell", address: Address.new(zipcode: '6816'))
book = Product.new(name: 'Awesome book', type: :book, price: 15, attributes: {})
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
p payment_book.paid? # < true
p payment_book.order.items.first.product.type

shipping = Shipping.new(book_order)
shipping.ship
# now, how to deal with shipping rules then?