from bootstrap import Costumer, Product, Order, Payment, CreditCard, Shipping

foolano = Costumer("William", "william@will.com")
membership = Product(name="Membership", type="membership")

membership_order = Order(foolano)
membership_order.add_product(membership)

attributes = dict(
    order=membership_order,
    payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
)
payment_membership = Payment(attributes=attributes)
payment_membership.pay()

if payment_membership.is_paid():
    print(" ***** Pagamento realizado ******* ")
    shipping = Shipping(payment_membership)
    shipping.ship()
else:
    print(" ======= Falaha no pagamento ======")