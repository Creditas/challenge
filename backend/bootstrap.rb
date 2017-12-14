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

  def send (customer, invoice) 
    puts "Processing #{@type} order"
  end
end

class Physical < Product
  attr_reader :height, :width, :length, :weight

  def initialize(name:)
    super(name: name, type: :physical)
  end

  def send (customer, invoice)
    super(customer, invoice)
    generate_shipping_label(customer, invoice)
  end

  def generate_shipping_label(customer, invoice)
    # with appropriate informations about the physical item, customer and address
  end

end

class Membership < Product
  attr_reader :service, :duration

  def initialize(name:)
    super(name: name, type: :membership)
  end

  def send (customer, invoice)
    super(customer, invoice)
    activate_membership(customer)
    notify_customer(customer)
  end

  def activate_membership (customer)
    puts "Activating membership for #{customer.full_name}"
    # send customer data to service asking for activation?
  end

  def notify_customer(customer)
    # send mail with membership activation confirmation
  end

end

class Book < Physical
  attr_reader :isbn, :pages

  def initialize(name:)
    super(name: name)
    @type = :book
  end

  def generate_shipping_label(customer, invoice)
    super
    # add information about taxes exemption (Constituição Art. 150, VI, d.)
  end

end

class Digital < Product
  attr_reader :genre, :release, :artists

  def initialize(name:)
    super(name: name, type: :digital)
  end

  def send (customer, invoice)
    super(customer, invoice)
    notify_customer(customer)
  end

  def notify_customer(customer)
    generate_voucher()
    # send mail with data access and voucher information
  end

  def generate_voucher()
    # R$ 10,00 discount voucher generation
    # return voucher
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
  attr_reader :cpf, :full_name, :mail_address, :shipping_addressess, :default_credit_card
  def initialize(full_name)
    @full_name = full_name
  end
end

