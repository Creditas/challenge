from bootstrap import Costomer, Product, Order, Payment, CreditCard, Shipping

# Book Example (build new payments if you need to properly test it)
foolano = Costomer("William", "william@will.com")
book = Product(name='Awesome book', type='book')
book_order = Order(foolano)
book_order.add_product(book)

attributes = dict(
    order=book_order,
    payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
)
payment_book = Payment(attributes=attributes)
payment_book.pay()
if payment_book.is_paid():
    print(" ***** Pagamento realizado ******* ")
    shipping = Shipping(payment_book)
    shipping.ship()
else:
    print(" ======= Falaha no pagamento ======")
