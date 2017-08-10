#!/usr/bin/ruby -w
$LOAD_PATH << '.'

require 'Membership'
require 'CreditCard'
require 'Customer'
require 'Address'
require 'Product'
require 'OrderItem'
require 'Order'
require 'Invoice'
require 'Payment'


foolano = Customer.new
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano, type: :book)
book_order.add_product(book)

payment = PaymentFactory.createPaymentClass(book_order,CreditCard.fetch_by_hashed('43567890-987654367'), nil, nil, nil)

payment.pay()
p payment.paid? # < true
p payment.order.items.first.product.type