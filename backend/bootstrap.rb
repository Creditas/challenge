require './load'

customer = Customer.new(
  name: 'Zachery Tissell',
  address: Address.new(zipcode: '6816'),
  email: 'zachery@email.com'
)

book_product = Product.new(
  name: 'Homo deus',
  type: :book,
  price: 47,
  attributes: {}
)

physical_product = Product.new(
  name: 'Smartband Tway',
  type: :physical,
  price: 189,
  attributes: {}
)

digital_product = Product.new(
  name: 'Exile On Main Street',
  type: :digital,
  price: 10, attributes: {
    :full_name => 'Album: Exile On Main Street (1972)',
    :artist => 'The Rolling Stones'
  }
)
membership_product = Product.new(
  name: 'Wine Club',
  type: :membership,
  price: 120,
  attributes: {}
)

order = Order.new(customer)
order.add_product(book_product)
order.add_product(physical_product)
order.add_product(digital_product)
order.add_product(membership_product)

payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment.pay

shipping = Shipping.new(order)
shipping.ship

shipping.order.items.each do |order_item|
    print "Shipping log for Product " + order_item.product.name + ":\n"
    print order_item.shipping_log
    print "\n\n"
end
