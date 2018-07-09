require_relative '../lib/desafio_backend.rb'
require 'test/unit'

class TestDesafioBackend < Test::Unit::TestCase

  def create_customer
    customer = Customer.new(name: "foolano", email: "foolano@email.com")
    return customer
  end

  def create_order
    foolano = create_customer
    physical = Product.new(name: 'Awesome tablet', type: :physical)
    book = Product.new(name: 'Awesome book', type: :book)
    digital = Product.new(name: 'Awesome music', type: :digital)
    membership = Product.new(name: 'Awesome music', type: :membership)

    order = Order.new(foolano)

    order.add_product(physical)
    order.add_product(book)
    order.add_product(digital)
    order.add_product(membership)

    return order
  end

  def setup
    order = create_order

    payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment.pay
    return payment
  end

  def test_physical_product
    customer = create_customer
    payment = setup
    invoice = payment.invoice
    physical = PhysicalProductDeliver.new(invoice, customer)
    assert_equal("Shipping label: product", physical.process)
  end
  def test_book_product
    customer = create_customer
    payment = setup
    invoice = payment.invoice
    book = BookProductDeliver.new(invoice, customer)
    assert_equal("Shipping label: product, item isento de impostos conforme disposto na Constituição Art. 150, VI, d", book.process)
  end

  def test_digital_product
    customer = create_customer
    payment = setup
    invoice = payment.invoice
    digital = DigitalProductDeliver.new(invoice, customer)
    assert_equal("Email notification. You won a R$ 10 discount for the next order", digital.process)
  end

  def test_membership_product
    customer = create_customer
    payment = setup
    invoice = payment.invoice
    membership = MembershipProductDeliver.new(invoice, customer)
    assert_equal("Email notification. Your membership is activated", membership.process)
  end

  def test_all
    customer = create_customer
    payment = setup
    order = create_order
    separate = SeparateService.new(payment, order, customer)
    products = separate.process
    assert_equal("Shipping label: product", products[0])
    assert_equal("Shipping label: product, item isento de impostos conforme disposto na Constituição Art. 150, VI, d", products[1])
    assert_equal("Email notification. You won a R$ 10 discount for the next order", products[2])
    assert_equal("Email notification. Your membership is activated", products[3])
  end
end
