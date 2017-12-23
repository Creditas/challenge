class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at

  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoice, @order = attributes.values_at(:invoice, :order)
    @payment_method = attributes.values_at(:payment_method)
  end

  def pay(paid_at = Time.now)
    @amount = order.total_amount
    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(billing_address: order.address, shipping_address: order.address, order: order)
    @paid_at = paid_at
    order.close(@paid_at)
  end

  def paid?
    !paid_at.nil?
  end
end

class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(attributes = {})
    @billing_address = attributes.values_at(:billing_address)
    @shipping_address = attributes.values_at(:shipping_address)
    @order = attributes.values_at(:order).first
  end

  def to_s
    output = ['Dados da compra']
    order.items.each do |item|
      output << item.product.name
    end
    output << "Voucher: #{order.customer.voucher}" unless order.customer.voucher.nil?
    output.join("\n")
  end
end

class Order
  attr_reader :customer, :items, :payment, :address, :closed_at

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
  end

  def add_product(product)
    @items << @order_item_class.new(order: self, product: product)
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
    OrderPostProcessor.new(order: self).process
  end

  # remember: you can create new methods inside those classes to help you create a better design
end

class OrderItem
  attr_reader :order, :product

  def initialize(order:, product:)
    @order = order
    @product = product
  end

  def total
    10
  end
end

class OrderPostProcessor
  def initialize(order:)
    @order = order
  end

  def process
    if product_types.include?(:physical) || product_types.include?(:book)
      puts generate_shipping_label
    end
    puts activate_membership if product_types.include?(:membership)
    puts send_invoice
  end

  def generate_shipping_label
    label = ['Dados de envio do consumidor']
    label << 'Inclui itens isentos de imposto' if product_types.include?(:book)
    ShippingLabel.new(order: @order, label: label.join("\n"))
  end

  def activate_membership
    items_by_type(:membership).each do |item|
      membership = Membership.new(product: item.product).activate!
      @order.customer.add_membership(membership)
    end
    @order.customer.memberships
  end

  def send_invoice
    address = @order.customer.default_address
    invoice = Invoice.new(order: @order, billing_address: address, shipping_address: address)
    @order.customer.add_voucher('CYBERMONDAY') if product_types.include?(:digital)
    # TODO: InvoiceMailer.new(invoice: invoice).send!
    invoice
  end

  private

  def product_types
    @order.items.map { |item| item.product.type }.uniq
  end

  def items_by_type(type)
    @order.items.select { |item| item.product.type == type }
  end
end

class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type

  def initialize(name:, type:)
    @name, @type = name, type
  end
end

class Address
  attr_reader :zipcode

  def initialize(zipcode:)
    @zipcode = zipcode
  end
end

class CreditCard
  def self.fetch_by_hashed(code)
    CreditCard.new
  end
end

class Customer
  attr_reader :memberships, :voucher
  attr_accessor :addresses

  def initialize
    @memberships = []
    @addresses = []
  end

  def add_membership(membership)
    @memberships << membership
    # TODO: MembershipMailer.new(customer: @customer).send! if membership.active?
    membership
  end

  def add_voucher(voucher)
    @voucher = voucher
  end

  def default_address
    @addresses.first
  end
end

class Membership
  attr_reader :active
  alias_method :active?, :active

  def initialize(product:)
    @product = product
    @active = false
  end

  def activate!
    @active = true
    self
  end

  def to_s
    active ? "Assinatura ativa" : "Assinatura inativa"
  end
end

class ShippingLabel
  def initialize(order:, label:)
    @order = order
    @label = label
  end

  def to_s
    @label
  end
end

require 'minitest/autorun'

class Bootstrap < Minitest::Test
  def test_provided_example
    foolano = Customer.new
    book = Product.new(name: 'Awesome book', type: :book)
    book_order = Order.new(foolano)
    book_order.add_product(book)
    book_payment = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    out, err = capture_io { book_payment.pay }
    assert book_payment.paid?
  end
end

class Bootstrap::OrderPostProcessor < Minitest::Test
  def setup
    @customer = Customer.new
    @customer_cc = CreditCard.fetch_by_hashed '43567890-987654367'

    @book = Product.new(name: 'Awesome book', type: :book)
    @pen = Product.new(name: 'Bic Cristal', type: :physical)
    @music_sub = Product.new(name: 'Music streaming service', type: :membership)
    @stairway_to_heaven = Product.new(name: 'Led Zeppelin - 04 - Stairway to Heaven.mp3', type: :digital)
  end

  def test_shipping_label_for_books
    order = Order.new(@customer)
    order.add_product(@book)

    out, err = capture_io { Payment.new(order: order).pay }
    assert_match /Dados de envio do consumidor/, out
    assert_match /Inclui itens isentos de imposto/, out
  end

  def test_shipping_label_for_physical
    order = Order.new(@customer)
    order.add_product(@pen)

    out, err = capture_io { Payment.new(order: order).pay }
    assert_match /Dados de envio do consumidor/, out
    refute_match /Inclui itens isentos de imposto/, out
  end

  def test_shipping_label_for_mixed_order
    order = Order.new(@customer)
    order.add_product(@book)
    order.add_product(@pen)

    out, err = capture_io { Payment.new(order: order).pay }
    assert_match /Dados de envio do consumidor/, out
    assert_match /Inclui itens isentos de imposto/, out
  end

  def test_membership
    order = Order.new(@customer)
    order.add_product(@music_sub)
    assert @customer.memberships.empty?

    out, err = capture_io { Payment.new(order: order).pay }
    assert_match /Assinatura ativa/, out
    assert_equal 1, @customer.memberships.size
    assert @customer.memberships.first.active?
  end

  def test_invoice
    order = Order.new(@customer)
    order.add_product(@music_sub)

    out, err = capture_io { Payment.new(order: order).pay }
    assert_match /Dados da compra/, out
    assert_match /#{@music_sub.name}/, out
  end

  def test_invoice_and_voucher
    order = Order.new(@customer)
    order.add_product(@stairway_to_heaven)

    out, err = capture_io { Payment.new(order: order).pay }
    assert_match /Dados da compra/, out
    assert_match /#{@stairway_to_heaven.name}/, out
    assert_match /Voucher/, out
  end
end
