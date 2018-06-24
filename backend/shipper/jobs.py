# coding: utf-8

# Book Example (build new payments if you need to properly test it)
foolano = Customer()
book = Product(name='Awesome book', type='book', price='')
book_order = Order(foolano)
book_order.add_product(book)

attributes = dict(
    order=book_order,
    payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
)
payment_book = Payment(attributes=attributes)
payment_book.pay()
print(payment_book.is_paid())  # < true
print(payment_book.order.items[0].product.type)


