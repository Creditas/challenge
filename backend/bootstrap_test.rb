require_relative 'bootstrap'
require 'test/unit/testcase'

#Teste unitários
class PaymentFlowTest < Test::Unit::TestCase

  def test_payment_flow_for_book
    address = Address.new(zipcode: "00000-000")
    foolano = Customer.new(address: address, email: "foolano@gmail.com")
    book = Product.new(name: 'Awesome book', type: :book)
    book_order = Order.new(foolano)
    book_order.add_product(book)

    payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    payment_flow = PaymentFlow.new(payment: payment_book)
    result = payment_flow.execute

    assert_equal "It book", result
  end

  def test_payment_flow_for_physical_item
    address = Address.new(zipcode: "00000-000")
    foolano = Customer.new(address: address, email: "foolano@gmail.com")
    physical_item = Product.new(name: 'Video Game', type: :physical_item)
    physical_item_order = Order.new(foolano)
    physical_item_order.add_product(physical_item)

    payment_physical_item = Payment.new(order: physical_item_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    payment_flow = PaymentFlow.new(payment: payment_physical_item)
    result = payment_flow.execute

    assert_equal "It physical item", result
  end

  def test_payment_flow_for_service_subscription
    address = Address.new(zipcode: "00000-000")
    foolano = Customer.new(address: address, email: "foolano@gmail.com")
    service_subscription = Product.new(name: 'Credito Gold', type: :service_subscription)
    service_subscription_order = Order.new(foolano)
    service_subscription_order.add_product(service_subscription)

    payment_service_subscription = Payment.new(order: service_subscription_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    payment_flow = PaymentFlow.new(payment: payment_service_subscription)
    result = payment_flow.execute

    assert_equal "It services subscription", result
  end

  def test_payment_flow_for_ddigital_mediaigital_media
    address = Address.new(zipcode: "00000-000")
    foolano = Customer.new(address: address, email: "foolano@gmail.com")
    digital_media = Product.new(name: 'Credito Gold', type: :digital_media)
    digital_media_order = Order.new(foolano)
    digital_media_order.add_product(digital_media)

    payment_digital_media = Payment.new(order: digital_media_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    payment_flow = PaymentFlow.new(payment: payment_digital_media)
    result = payment_flow.execute

    assert_equal "It digital media", result
  end

end
