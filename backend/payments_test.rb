require 'rubygems'
gem 'mocha'
require 'test/unit'
require 'mocha/test_unit'
require_relative "bootstrap"

class PaymentsTest < Test::Unit::TestCase

  def setup
    @foolano = Customer.new(name: "Foolano", email: "foolano@foo.com")
    @payment_method = CreditCard.fetch_by_hashed('43567890-987654367')
    @shipping_address = Address.new(zipcode: 3001)
  end

  def test_payment_book
    book = Book.new(name: 'Awesome book')
    book_order = Order.new(@foolano, address: @shipping_address)
    book_order.add_product(book)
    assert_equal(10, book_order.total_amount)
    
    payment_book = Payment.new(order: book_order, payment_method: @payment_method)
    book.expects(:print_shipping_label).with(@shipping_address)
    payment_book.pay
    assert_equal(true, payment_book.paid?)
  end
  
  def test_payment_physical
    physical = Physical.new(name: 'Computer')
    physical_order = Order.new(@foolano, address: @shipping_address)
    physical_order.add_product(physical)
    assert_equal(10, physical_order.total_amount)
    
    payment_physical = Payment.new(order: physical_order, payment_method: @payment_method)
    physical.expects(:print_shipping_label).with(@shipping_address)
    payment_physical.pay
    assert_equal(true, payment_physical.paid?)
  end
  
  def test_payment_membership
    membership = Membership.new
    membership_order = Order.new(@foolano)
    membership_order.add_product(membership)
    assert_equal(10, membership_order.total_amount)
    
    payment_membership = Payment.new(order: membership_order, payment_method: @payment_method)
    membership.expects(:activate_subscription)
    membership.expects(:notify_user).with(@foolano)
    payment_membership.pay
    assert_equal(true, payment_membership.paid?)
  end
  
  def test_payment_digital
    digital = Digital.new(name: "First Digital EP")
    digital_order = Order.new(@foolano)
    digital_order.add_product(digital)
    assert_equal(0, digital_order.total_amount)
    
    payment_digital = Payment.new(order: digital_order, payment_method: @payment_method)
    digital.expects(:send_purchase_by_email).with(@foolano)
    payment_digital.pay
    assert_equal(true, payment_digital.paid?)
  end
  
end