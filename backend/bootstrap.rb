require_relative "customer"
require_relative "product"
require_relative "order"
require_relative "payment"
require_relative "credit_card"
require_relative "shipping"
require_relative "membership"

foolano = Customer.new(name: "Gabriel", email: "gabrieljustware@gmail.com")
book = Book.new(name: 'Awesome book', value: 10)
book_order = Order.new(foolano)
book_order.add_item(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay

p payment_book.paid?
p payment_book.order.items.first.item.name

shipping = Shipping.new(payment_book)
shipping.ship

membership = Membership.new(name: "Assinatura do serviço creditas.", customer: foolano, value: 10)
membership_order = Order.new(foolano)
membership_order.add_item(membership)

payment_membership = Payment.new(order: membership_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_membership.pay

p payment_membership.paid?
p payment_membership.order.items.first.item.name

shipping = Shipping.new(payment_membership)
shipping.ship
