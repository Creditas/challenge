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
    @order = attributes.values_at(:order)
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

class Voucher
  attr_reader :value, :customer

  def initialize(value:, customer:)
    @value = value
    @customer = customer
  end
end


class Customer
  # you can customize this class by yourself
  attr_reader :name, :email, :vouchers

  def initialize(name:, email:, vouchers: nil)
    @name  = name
    @email = email
    @vouchers = (vouchers || Array.new)
  end

  def add_voucher(value)
    vouchers << Voucher.new(value: value, customer: self)
  end
end

class Membership
  attr_reader :customer, :service, :is_active

  def initialize(customer:, service:)
    @customer = :customer
    @service = :service
  end

  def make_active()
    @is_active = true
  end
end

class PostPaymentStrategyContext
  def initialize()
    @strategies = Hash.new
    @strategies[:physical] = PhysicalStrategy.new
    @strategies[:book] = BookStrategy.new
    @strategies[:digital] = DigitalStrategy.new
    @strategies[:membership] = MembershipStrategy.new
  end

  def execute(product:, customer:)
    @strategy = @strategies[product.type]
    @strategy.execute(product, customer)
  end
end

class PostPaymentStrategy
  def execute(product, customer)
    puts 'not implemented'
  end
end

class PhysicalStrategy < PostPaymentStrategy
  def execute(product, customer)
    puts 'PhysicalStrategy Activated'
    puts 'Generating physical product shipping label'
    puts "\n"
  end
end

class BookStrategy < PostPaymentStrategy
  def execute(product, customer)
    puts 'BookStrategy Activated'
    puts 'Generating book shipping label - item isento de impostos conforme disposto na Constituição Art. 150, VI, d'
    puts "\n"
  end
end

class DigitalStrategy < PostPaymentStrategy
  def execute(product, customer)
    puts 'DigitalStrategy Activated'
    puts 'Calling e-mail service with order info'
    puts 'Adding a R$ 10 voucher to customer'
    puts "Customer vouchers: #{customer.vouchers.size}"
    customer.add_voucher(10)
    puts "Customer vouchers: #{customer.vouchers.size}"
    puts "\n"
  end
end

class MembershipStrategy < PostPaymentStrategy
  def execute(product, customer)
    puts 'Calling e-mail service with membership info'
    puts 'Creating membership record for the customer and making it active'
    membership = Membership.new(customer: customer, service: product.name)
    membership.make_active
    puts "#{customer.name}'s membership is active? #{membership.is_active}"
    puts "\n"
  end
end


# Book Example (build new payments if you need to properly test it)
foolano = Customer.new(name: 'Foolano Baz', email: 'foolano@creditas.com.br')
physicalPrduct = Product.new(name: 'Awesome physical product', type: :physical)
bookProduct = Product.new(name: 'Awesome book', type: :book)
digitalProduct = Product.new(name: 'Awesome digital product', type: :digital)
membershipProduct = Product.new(name: 'Awesome membership', type: :membership)

order = Order.new(foolano)
order.add_product(physicalPrduct)
order.add_product(bookProduct)
order.add_product(digitalProduct)
order.add_product(membershipProduct)

order_payment = Payment.new(
                  order: order,
                  payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
order_payment.pay

if order_payment.paid?
  strategyContext = PostPaymentStrategyContext.new

  order_payment.order.items.each do |item|
    strategyContext.execute(
      product: item.product,
      customer: order_payment.order.customer)
  end
end