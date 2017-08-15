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
    order.ship()
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

  def ship
    ShippingLabel.new(order: self).print if @items.any? { |item | item.product.is_physical? }

    if @items.any? { |item | item.product.is_digital? }
      self.send_details_email
      @customer.add_voucher(Voucher.new(amount: 10))
    end

    @items.each do |item |
      #this should also check if customer already has a membership for the service,
      #but is pointless without persistent data
      if item.product.is_membership?
        membership = Membership.new(customer: @customer, service: item.product.name, active: true)
        membership.send_notification_email
      end
    end
  end

  def send_details_email
    puts "Sending order details email to #{self.customer.email}"
    puts "Purchased items: \n #{self.items.map(&:product).map(&:name).join('\n')}"
  end
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
  #this is a little confusing, a book can be both physical and digital
  attr_reader :name, :type

  def initialize(name:, type:)
    @name, @type = name, type.downcase.to_sym
  end

  def is_digital?
    self.type == :digital
  end

  def is_physical?
    self.type == :physical || self.type == :book
  end

  def is_book?
    self.type == :book
  end

  def is_membership?
    self.type == :membership
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
  attr_reader :name, :email, :vouchers

  def initialize(name:, email:, vouchers: [])
    @name, @email = name, email
    @vouchers = vouchers
  end

  def add_voucher(voucher)
    puts "Adding #{voucher.amount}% voucher to customer #{self.name}"
    @vouchers << voucher
  end
end

class Membership
  attr_reader :customer, :service, :active

  def initialize(customer:, service:, active: false)
    @customer, @service, @active = customer, service, active
  end

  def send_notification_email()
    p "sending Membership email to customer #{@customer.email}"
    p "subscribed to #{self.service}"
  end
end

class Voucher
  attr_reader :amount

  def initialize(amount:)
    @id = Random.rand.to_s[2..15]
    @amount = amount
  end
end

class ShippingLabel
  attr_reader :order

  def initialize(order:)
    @order = order
  end

  def print()
    puts "printing shipping label for customer #{self.order.customer.name}'s order"
    puts "Ship to: #{self.order.address.zipcode}"
    if self.order.items.any? { |item| item.product.is_book? }
      puts "This order has a tax-exempt item as provided in the Constitution Art. 150, VI, d."
    end
  end
end

foolano = Customer.new(name: 'Foolano', email: 'foolano@abc.com')
credit_card = CreditCard.fetch_by_hashed('43567890-987654367')

#Book
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)
payment_book = Payment.new(order: book_order, payment_method: credit_card)
payment_book.pay

#Physical
physical = Product.new(name: 'Awesome physical product', type: :physical)
physical_order = Order.new(foolano)
physical_order.add_product(physical)
payment_physical = Payment.new(order: physical_order, payment_method: credit_card)
payment_physical.pay

#Digital
digital = Product.new(name: 'Music Album', type: :digital)
digital_order = Order.new(foolano)
digital_order.add_product(digital)
payment_digital = Payment.new(order: digital_order, payment_method: credit_card)
payment_digital.pay

#Membership
membership = Product.new(name: 'Streaming subscription', type: :membership)
membership_order = Order.new(foolano)
membership_order.add_product(membership)
payment_membership = Payment.new(order: membership_order, payment_method: credit_card)
payment_membership.pay
