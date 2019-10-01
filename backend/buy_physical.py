from bootstrap import Costumer, Product, Order, Payment, CreditCard, Shipping
foolano = Costumer("William", "william@will.com")
phone = Product(name="Xiaomi Redmi 7", type="physical")
phone_order = Order(foolano)
phone_order.add_product(phone)

attributes = dict(
    order=phone_order,
    payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
)
payment_phone = Payment(attributes=attributes)
payment_phone.pay()
if payment_phone.is_paid():
    print(" ***** Pagamento realizado ******* ")
    shipping = Shipping(payment_phone)
    shipping.ship()
else:
    print(" ======= Falaha no pagamento ======")
