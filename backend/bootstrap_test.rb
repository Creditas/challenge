require 'test/unit'
require './bootstrap'

class OrderDispatchTest < Test::Unit::TestCase
  def setup
    @cus = Customer.new(name: "John Doe")
  end

  def test_physical_purchase_shipping_label
    product = Product.new(name: 'Playstation 4', type: :physical)

    order = Order.new(@cus)
    order.add_product(product)

    payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment.pay

    dispatch = OrderDispatch.new(payment: payment)
    dispatch.ship_it

    assert payment.paid?
    assert dispatch.has_shipping_label?
    assert_match /\d{5}-\d{3}/, dispatch.render_shipping_label
    assert_not_match /Tax free/, dispatch.render_shipping_label
  end

  def test_book_purchase_shipping_label
    # Book Example (build new payments if you need to properly test it)
    # now, how to deal with shipping rules then?
    book = Product.new(name: 'Awesome book', type: :book)

    order = Order.new(@cus)
    order.add_product(book)

    payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment.pay

    dispatch = OrderDispatch.new(payment: payment)
    dispatch.ship_it

    assert payment.paid?
    assert_equal payment.order.items.first.product.type, :book
    assert dispatch.has_shipping_label?
    assert_match /\d{5}-\d{3}/, dispatch.render_shipping_label
    assert_match /Tax free/, dispatch.render_shipping_label
  end

  def test_subscription_email
    subs = Product.new(name: 'Spotify Premium', type: :subscription)

    order = Order.new(@cus)
    order.add_product(subs)

    payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment.pay

    dispatch = OrderDispatch.new(payment: payment)
    dispatch.ship_it

    assert payment.paid?
    assert (not dispatch.has_shipping_label?)
    assert dispatch.has_digital_products?
    assert dispatch.has_subscription?
    assert_match /Spotify Premium/, dispatch.render_email
  end

  def test_digital_media_purchase_email_plus_voucher
    media = Product.new(name: 'Alien Covenant (2017)', type: :digital_media)

    order = Order.new(@cus)
    order.add_product(media)

    payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment.pay

    dispatch = OrderDispatch.new(payment: payment)
    dispatch.ship_it

    assert payment.paid?
    assert (not dispatch.has_shipping_label?)
    assert dispatch.has_digital_products?
    assert dispatch.has_voucher?
    assert_match /Alien Covenant/, dispatch.render_email
  end
end
