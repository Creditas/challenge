Dir.glob(File.expand_path("../lib/*.rb", __FILE__)).each do |file|
  require file
end

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
    run_actions_after_close
  end

  def run_actions_after_close
    @items.each do |order_item|
      order_item.run_actions_after_close_order
    end
  end
  # remember: you can create new methods inside those classes to help you create a better design
end


class OrderItem
  attr_reader :order, :product
  # changes (order, product) arguments to attributes to become like the other classes with named params
  def initialize(attributes = {})
    @order, @product = attributes.values_at(:order, :product)
  end

  def total
    10
  end

  def run_actions_after_close_order
    print_shipping_label if @product.type.shipping_label
    send_discount if @product.type.send_discount?
    activate_subscription if @product.type.is_service?
  end

  private
    def print_shipping_label
      Labeler.print_shipping_label(@product.type.shipping_label)
    end

    def send_discount
      @order.customer.add_coupon('10')
      send_mail
    end

    def send_mail
      Mailer.send_mail(@product.type.mail_body)
    end

    def activate_subscription
      @order.customer.add_subscription(@product.name)
      send_mail
    end
end

class Product
  attr_reader :name, :type
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  
  # Hash to map product type classes
  PRODUCT_TYPES = {
    book: BookType,
    service: ServiceType,
    physical_product: PhysicalProductType,
    media: MediaType
  }

  # changes (name, type) arguments to attributes to become like the other classes with named params
  def initialize(attributes = {})
    @name, type = attributes.values_at(:name, :type)
    @type = PRODUCT_TYPES[type].new
  end
end

class Address
  attr_reader :zipcode

  def initialize(zipcode)
    @zipcode = zipcode
  end
end

class CreditCard
  def self.fetch_by_hashed(code)
    CreditCard.new
  end
end

class Customer
  attr_reader :coupons, :subscriptions
  def initialize(attributes = {})
    @name = attributes.values_at(:name)
    @coupons = []
    @subscriptions = []
  end

  def add_coupon(discount)
    @coupons << Coupon.new(discount)
  end

  def add_subscription(service_name)
    @subscriptions << Subscription.new(service_name)
  end
end

# Book Example (build new payments if you need to properly test it)

foolano = Customer.new(name: 'joao')
book = Product.new(name: 'Neverwhere', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay

p payment_book.paid? # < true
p payment_book.order.items.first.product.type.name


p "Coupons #{foolano.coupons.map(&:discount)}"
p "Subscriptions #{foolano.subscriptions.map(&:name)}"
