require 'bigdecimal'

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
  DIGITAL_TYPES  = [:subscription, :digital_media]
  TAX_FREE_TYPES = [:book]
  ALLOWS_VOUCHER = [:digital_media]

  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type

  def initialize(name:, type:)
    @name, @type = name, type
  end

  def tax_free?
    TAX_FREE_TYPES.include? @type
  end

  def allow_voucher?
    ALLOWS_VOUCHER.include? @type
  end

  def digital?
    DIGITAL_TYPES.include? @type
  end

  def physical?
    not digital?
  end

  def subscription?
    @type == :subscription
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
  attr_reader :name

  def initialize(name:)
    @name = name
  end
end

class Membership
  attr_reader :payment, :customer, :product

  def initialize(customer:, payment:, product:)
    @customer = customer
    @payment = payment
    @product = product
  end

  def save
    # TODO
  end
end

class Voucher
  attr_reader :payment, :customer, :value

  def initialize(customer:, payment:, value:)
    @customer = customer
    @payment = payment
    @value = value
  end

  def save
    # TODO
  end
end

class OrderDispatch
  attr_reader :payment

  def initialize(payment:)
    @payment = payment
    @customer = payment.order.customer
    @products = payment.order.items.map(&:product)
  end

  def has_tax_free?
    @products.select(&:tax_free?).any?
  end

  def has_subscription?
    @products.select(&:subscription?).any?
  end

  def has_voucher?
    @products.select(&:allow_voucher?).any?
  end

  def has_digital_products?
    @products.select(&:digital?).any?
  end

  def has_shipping_label?
    @products.select(&:physical?).any?
  end

  def render_shipping_label
    %(
      -------------------
      From: Merchant Name

      To:
      \t#{@customer.name}
      \tLorem ipsum St.
      \tSao Paulo, SP, #{@payment.order.address.zipcode}

      #{"Obs: Tax free product" if has_tax_free?}
      --------------------
    ).gsub(/^\s+/, "").strip
  end

  def render_email
    %(
      Dear #{@customer.name}

      Your order was received and processed:
      #{@products.select(&:digital?).map(&:name).join("\n")}

      #{"You won a $10 voucher for your next purchase" if has_voucher?}
    ).gsub(/^\s+/, "").strip
  end

  def send_email(body)
    # TODO
  end

  def ship_package(shipping_label)
    # TODO
  end

  def ship_it
    # Mostly executes a bunch of side effects
    if has_voucher?
      voucher = Voucher.new(customer: @customer, payment: @payment, value: BigDecimal.new("10.0"))
      voucher.save
    end

    if has_subscription?
      @products.select(&:subscription?).each do |item|
        membership = Membership.new(customer: @customer, payment: @payment, product: item)
        membership.save
      end
    end

    if has_shipping_label?
      ship_package(render_shipping_label)
    end

    if has_digital_products?
      send_email(render_email)
    end
  end
end
