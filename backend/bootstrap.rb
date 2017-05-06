require './model/actions/action'
require './model/actions/active_membership'
require './model/actions/address_shipping_label'
require './model/actions/create_voucher'
require './model/actions/email_active_membership'
require './model/actions/email_payment'
require './model/payment_actions'
require './model/address'
require './model/credit_card'
require './model/customer'
require './model/order_item'
require './model/order'
require './model/invoice'
require './model/payment'
require './model/product'
require './model/membership'


foolano = Customer.new(name: 'Fernando', email: 'teste@example.com')

pen = Product.new(name: 'A simple pen', type: :physical, price: 25)
book = Product.new(name: 'Awesome book', type: :book, price: 25)
membership = Membership.new(name: 'nice service', type: :membership, price: 25)
music = Product.new(name: 'My best song', type: :digital, price: 25)

order = Order.new(foolano)
order.add_product(pen)
order.add_product(book)
order.add_product(membership)
order.add_product(music)

payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment.pay
p payment.paid? # < true
p order.total_amount # < 90, instead 100
