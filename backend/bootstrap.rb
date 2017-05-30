# Require everything in the right order
require './initialization'


def run_book_example
  p "---- Book example ----"
  # Book Example (build new payments if you need to properly test it)
  foolano = Customer.new(email: 'john@example.com', name: 'John', addresses: [Address.new(zipcode: '00100-010')])
  book = Product.new(name: 'Awesome book', type: :book)
  book_order = Order.new(foolano)
  book_order.add_product(book)

  payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  payment_book.pay
  # p payment_book.paid? # < true
  # p payment_book.order.items.first.product.type

  book_order.materialize_order

end

def run_shoe_example
  p "---- Shoe example ----"
  # Book Example (build new payments if you need to properly test it)
  foolano = Customer.new(email: 'john@example.com', name: 'John', addresses: [Address.new(zipcode: '00100-010')])
  shoe = Product.new(name: 'Great shoe', type: :physical)
  shoe_order = Order.new(foolano)
  shoe_order.add_product(shoe)

  payment = Payment.new(order: shoe_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  payment.pay
  # p payment.paid? # < true
  # p payment.order.items.first.product.type

  shoe_order.materialize_order

end

def run_membership_example
  p "---- Membership example ----"
  # Book Example (build new payments if you need to properly test it)
  foolano = Customer.new(email: 'john@example.com', name: 'John', addresses: [Address.new(zipcode: '00100-010')])
  product = Product.new(name: 'Gym pass', type: :membership)
  order = Order.new(foolano)
  order.add_product(product)

  payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  payment.pay
  # p payment.paid? # < true
  # p payment.order.items.first.product.type

  order.materialize_order

end

def run_digital_example
  p "---- Digital example ----"
  # Book Example (build new payments if you need to properly test it)
  foolano = Customer.new(email: 'john@example.com', name: 'John', addresses: [Address.new(zipcode: '00100-010')])
  product = Product.new(name: 'Digital content', type: :digital)
  order = Order.new(foolano)
  order.add_product(product)

  payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  payment.pay
  # p payment.paid? # < true
  # p payment.order.items.first.product.type

  order.materialize_order
end

def run_multiple_items_example
  p "---- Multiple items example ----"
  # Book Example (build new payments if you need to properly test it)
  foolano = Customer.new(email: 'john@example.com', name: 'John', addresses: [Address.new(zipcode: '00100-010')])

  digital = Product.new(name: 'Digital content', type: :digital)
  membership = Product.new(name: 'Membership', type: :membership)
  book = Product.new(name: 'The Master Algorithm', type: :book)

  order = Order.new(foolano)
  order.add_product(digital)
  order.add_product(membership)
  order.add_product(book)

  payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  payment.pay
  # p payment.paid? # < true
  # p payment.order.items.first.product.type

  order.materialize_order
end

run_shoe_example
run_book_example
run_digital_example
run_membership_example
run_multiple_items_example
