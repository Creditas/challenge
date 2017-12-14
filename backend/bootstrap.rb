require 'securerandom'

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

  def ship
    # could choose to process order items inside the OrderItem class, but in that case shipping
    # rules would be too opaque to Payment.ship :(
    return if !self.paid?

    @order.items.each do |order_item|
      order_item.generate_shipping_label(@invoice.shipping_address)
      order_item.activate_membership_service
      order_item.send_digital_description_and_voucher
    end
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

  def products
    @items.map(&:product)
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

class ShippingLabel
  attr_reader :address, :remarks

  def initialize(address, overrides = {})
    @address = address
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    @remarks = overrides.fetch(:remarks) { [] }
  end

  def add_remark(line)
    @remarks << line.to_s
  end
end

class OrderItem
  attr_reader :order, :product, :shipping_label, :membership, :voucher

  def initialize(order:, product:)
    @order = order
    @product = product
  end

  def activate_membership_service
    return if @membership.is_a? Membership # we don't want to generate it twice
    return if !@product.activates_membership_services?
    # let's assume the membership service subscription is hereby done;

    @membership = Membership.new(@order)
    @membership.send_customer_notification # if desirable, this may be done in its constructor,
                                           # but I find it risky to do so
  end

  def send_digital_description_and_voucher
    return if @voucher.is_a? Voucher # we don't want to generate it twice
    return if !@product.sends_digital_description_and_voucher?

    @voucher = Voucher.new(@order, 10.00)
    @voucher.create_voucher
    @voucher.send_customer_notification
  end

  def activate_membership_service!
    activate_membership_service
  end

  def generate_shipping_label(address)
    return if !@shipping_label.nil? # we don't want to generate it twice
    return if !@product.generates_shipping_label?

    @shipping_label = ShippingLabel.new(address)

    # add remark is product is a book
    if @product.receives_remark_from_tax_exemption?
      @shipping_label.add_remark("Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.")
    end
  end

  def total
    10
  end
end

class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type

  # types:
  # [ :book, :physical, :digital, :membership ]
  #
  # main rules are in:
  # receives_remark_from_tax_exemption? (for now, :book)
  # generates_shipping_label? (for now, :physical, :book)
  # activates_membership_services? (for now, :membership)
  # sends_digital_description_and_voucher? (for now, :digital)

  def initialize(name:, type:)
    @name, @type = name, type
  end

  def receives_remark_from_tax_exemption?
    [:book].include? @type.to_sym
  end

  def generates_shipping_label?
    self.is_physical?
  end

  def activates_membership_services?
    self.is_membership?
  end

  def sends_digital_description_and_voucher?
    self.is_digital?
  end

  def is_physical?
    [:physical, :book].include? @type.to_sym
  end

  def is_book?
    [:book].include? @type.to_sym
  end

  def is_membership?
    [:membership].include? @type.to_sym
  end

  def is_digital?
    [:digital].include? @type.to_sym
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
  # you can customize this class by yourself
  attr_reader :name, :email

  def initialize(attributes = {})
    @name, @email = attributes.values_at(:name, :email)
  end
end

class Voucher
  attr_reader :order, :code, :value

  def initialize(order, value)
    @order = order
    @value = value
  end

  def create_voucher
    @code = SecureRandom.uuid.gsub('-', '')
  end

  def send_customer_notification
    self.create_voucher if @code.nil?

    puts "sent voucher notification to #{@order.customer.name} in #{@order.customer.email} with code #{@code}, value is #{'%.2f' % @value}"
  end
end

class Membership
  attr_reader :order, :has_membership

  def initialize(order)
    @order = order
  end

  def create_membership
    # code to create membership here

    @has_membership = true
  end

  def send_customer_notification
    self.create_membership if @membership_info.nil?

    puts "sent notification to #{@order.customer.name} in #{@order.customer.email} to notify about subscription (membership) in order closed at #{@order.closed_at}"
  end

  # you can customize this class by yourself
end




# Book Example (build new payments if you need to properly test it)
foolano = Customer.new(name: 'Foolano da Silva', email: 'foolano@foo.bar')
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
# p payment_book.paid? # < true
# p payment_book.order.items.first.product.type

# now, how to deal with shipping rules then?

#
# receiving an input (Payment / Order): @payment.ship
# 1. generate shipping label for physical items (book, physical)
#    (PS: rule is not clear; it would be better to state which items would be classified as
#    physical in this example; if you provide "book", "videocard" // "digital", "membership":
#    "physical" was an example but it certainly include books as "physical" is a category; if it's
#    treated as "other physical items", it would be nice to specify)
#
# 2. if it's a "membership", activate it and notify the user about its activation.
#
# 3. if a common book is being paid, generate shipping label notifying it's a tax free item
#    according to "Constituição Art. 150, VI, d"
#
# 4. if the payment's for a digital media (music, video):
#    - send description to buyer by e-mail
#    - give the buyer a R$ 10 discount voucher
#
# on 1:
#   shipping label is implemented in OrderItem because an invoice may not be entirely fulfilled in
#   only one delivery

def assert(text, bool)
  puts bool ? '[OK] ' + text : '[NOT OK] ' + text
end
def announce(text, newline_before=false)
  puts if newline_before
  puts "--- #{text.upcase} ---"
end


announce("Book payment", false)
assert("payment contains product type book", payment_book.order.products.map(&:type) == [:book])
payment_book.ship # shipped! shipping method is separated from payment because shipping may in
                  # some cases occur only within a dashboard from an attendant

assert("upon ship, did NOT generate a membership for a subscription", !payment_book.order.items.first.membership.is_a?(Membership))
assert("upon ship, did NOT generate a voucher for further discount", !payment_book.order.items.first.voucher.is_a?(Voucher))
assert("upon ship, generated a shipping label", payment_book.order.items.first.shipping_label.is_a?(ShippingLabel))
assert("upon ship, generated a shipping label with an address", payment_book.order.items.first.shipping_label.address.first.is_a?(Address))
assert("upon ship, generated a shipping label with more than one remark", payment_book.order.items.first.shipping_label.remarks.length > 0)
assert("upon ship, generated a shipping label, remark is equal to spec'ced", payment_book.order.items.first.shipping_label.remarks.first == 'Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.')

announce("Physical product payment", true)

p_physical = Product.new(name: 'Awesome physical common product', type: :physical)
p_physical_order = Order.new(foolano)
p_physical_order.add_product(p_physical)

current_payment = Payment.new(order: p_physical_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
current_payment.pay
current_payment.ship

assert("payment contains product type physical", current_payment.order.products.map(&:type) == [:physical])
assert("upon ship, did NOT generate a membership for a subscription", !current_payment.order.items.first.membership.is_a?(Membership))
assert("upon ship, did NOT generate a voucher for further discount", !current_payment.order.items.first.voucher.is_a?(Voucher))
assert("upon ship, generated a shipping label", current_payment.order.items.first.shipping_label.is_a?(ShippingLabel))
assert("upon ship, generated a shipping label WITHOUT remarks", current_payment.order.items.first.shipping_label.remarks.length == 0)

p_digital = Product.new(name: 'Awesome digital music', type: :digital)
p_digital_order = Order.new(foolano)
p_digital_order.add_product(p_digital)

current_payment = Payment.new(order: p_digital_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
current_payment.pay

announce("Digital product payment", true)
current_payment.ship
assert("payment contains product type digital", (current_payment.order.products.map(&:type) == [:digital]))
assert("upon ship, did NOT generate a shipping label", !current_payment.order.items.first.shipping_label.is_a?(ShippingLabel))
assert("upon ship, did NOT generate a membership for a subscription", !current_payment.order.items.first.membership.is_a?(Membership))
assert("upon ship, generated a voucher for further discount", current_payment.order.items.first.voucher.is_a?(Voucher))
assert("upon ship, generated a voucher containing customer name", current_payment.order.items.first.voucher.order.customer.name == foolano.name)
assert("upon ship, generated a voucher containing customer email", current_payment.order.items.first.voucher.order.customer.email == foolano.email)

announce("Membership product payment", true)
p_membership = Product.new(name: 'Awesome membership', type: :membership)
p_membership_order = Order.new(foolano)
p_membership_order.add_product(p_membership)

current_payment = Payment.new(order: p_membership_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
current_payment.pay
current_payment.ship
assert("payment contains product type membership", (current_payment.order.products.map(&:type) == [:membership]))
assert("upon ship, did NOT generate a shipping label", !current_payment.order.items.first.shipping_label.is_a?(ShippingLabel))
assert("upon ship, did NOT generate a voucher for further discount", !current_payment.order.items.first.voucher.is_a?(Voucher))
assert("upon ship, generated a membership for a subscription", current_payment.order.items.first.membership.is_a?(Membership))
assert("upon ship, membership contains customer name", current_payment.order.items.first.membership.order.customer.name == foolano.name)
assert("upon ship, membership contains customer email", current_payment.order.items.first.membership.order.customer.email == foolano.email)
assert("upon ship, membership is successfully created", current_payment.order.items.first.membership.has_membership == true)
