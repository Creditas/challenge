# -*- encoding : utf-8 -*-
require 'test/unit'

require File.expand_path(File.dirname(__FILE__)) + '/bootstrap.rb'
require File.expand_path(File.dirname(__FILE__)) + '/order_item_types.rb'

class Teste < Test::Unit::TestCase
  
  def tests
    # physical, book, digital, membership, etc.
    physicalType = Physical.new
    serviceSubscriptionType = ServiceSubscription.new
    bookType = BookType.new
    digitalMediaType = DigitalMedia.new
    
    foolano = Customer.new
    book = Product.new(name: 'Awesome book', type: bookType)
    serviceSubscription = Product.new(name: 'Netflix Subscription', type: serviceSubscriptionType)
    physicalItem = Product.new(name: 'a bottle', type: physicalType)
    digitalMedia = Product.new(name: 'Pink Floyd Live in Pompeii', type: digitalMediaType)
    
    order = Order.new(foolano)
    order.add_product(book)
    order.add_product(serviceSubscription)
    order.add_product(physicalItem)
    order.add_product(digitalMedia)
    
    payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment.pay
    p payment.paid? # < true
    #p payment.order.items.first.product.type
    
    assert_equal 'Product with no taxes, according to country laws To put on box', payment.order.shippingLabel
    assert_equal true, payment.order.items.find {|item| item.product.type == serviceSubscriptionType}.product.type.activated
    assert_equal ' service activated buy description', foolano.readEmailReceived
    assert_equal '123456', foolano.vouchers.first.code
    
  end
end