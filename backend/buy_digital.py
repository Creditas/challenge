from bootstrap import Costomer, Product, Order, Payment, CreditCard, Shipping

foolano = Costomer("William", "william@will.com")
ebook = Product(name='Awesome ebook', type='digital')

ebook_order = Order(foolano)
ebook_order.add_product(ebook)

attributes = dict(
    order=ebook_order,
    payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
)
payment_ebook = Payment(attributes=attributes)
payment_ebook.pay()

if payment_ebook.is_paid():
    print(" ***** Pagamento realizado ******* ")
    shipping = Shipping(payment_ebook)
    shipping.ship()
else:
    print(" ======= Falaha no pagamento ======")