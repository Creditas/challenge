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
    @items.map(&:paid)
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
    10 - @product.discount
  end
  
  def paid
    @product.paid(@order)
  end
end

class Product
  attr_reader :name

  def initialize(name:)
    @name = name
  end
  
  def type
    self.class.name
  end
  
  def discount
    0
  end
  
  def paid(order)
    raise "Abstract class"
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
  attr_reader :name, :email

  def initialize(name:, email:)
    @name = name
    @email = email
  end
end

class Membership < Product
  # you can customize this class by yourself
  
  def initialize
    super(name: "Subscription")
  end
  
  def paid(order)
    activate_subscription
    notify_user(order.customer)
  end
  
  private
  
  def activate_subscription
    p "Activate Subscription"
  end
  
  def notify_user(user)
    p "Notify #{user.name}"
  end
end

class Physical < Product
  def paid(order)
    print_shipping_label(order.address)
  end
  
  protected
  
  def print_shipping_label(address)
    p "Shipping label: zipcode -> #{address.zipcode}"
  end
end

class Book < Physical
  def print_shipping_label(address)
    p "Shipping label for the book: #{@name}"
    p "zipcode -> #{address.zipcode}"
  end
end

class Digital < Product
  def paid(order)
    send_purchase_by_email(order.customer)
  end
  
  def discount
    10
  end
  
  private
  
  def send_purchase_by_email(user)
    p "Send Purchase to #{user.name}"
  end
end