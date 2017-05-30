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

class Shipment
  attr_reader :order
  
  def initialize(payment)
    @payment = payment
    @order = @payment.order
    @type = @order.items.first.product.type
  end
  
  def has_label?
    [:physical, :book].include? @type  
  end
  
  def set_label
    label = Label.new(address: @order.address.zipcode, notification: @order.no_tax? ? ' - No taxes according to Const. Art. 150, VI, d.' : '').print  
  end
  
  def has_membership?
    [:membership].include? @type 
  end
  
  def set_membership
    membership = Membership.new(customer: @order.customer, active: true).set_active
  end
  
  def is_digital?
    [:digital].include? @type  
  end
  
  def set_digital
    card = GiftCard.new(customer: @order.customer, payment: @payment, value: 10).send_gift_card     
  end
  
  def finish
    if has_label?
      set_label
    elsif has_membership?
      set_membership
    elsif is_digital?
      set_digital
    end
  end
end

class Label
  attr_reader :address, :notification
  
  def initialize(address:, notification:)
    @address = address
    @notification = notification
  end
  
  def print
    # print here 
    "Label: #{@address}#{@notification}"
  end
end

class Email
  attr_reader :to, :subject, :text
  
  def initialize(to,subject,text)
    @to = to
    @subject = subject
    @text = text
  end
  
  def send_email
    # send email here
    "To: #{@to} - Subject: #{@subject} - Text: #{@text}"
  end
end

class GiftCard
  attr_reader :customer, :payment
  
  def initialize(customer:, payment:, value:)
    @customer = customer
    @payment = payment
    @card_number = Random.rand(10000..20000)
    @value = value
  end
  
  def send_gift_card
    new_mail = Email.new(@customer.email,'Midia Order',"Hi #{@customer.name}, your order of #{@payment.order.items.first.product.name} is now complete. Please, receive this $#{@value} gift card (No.#{@card_number}) as our thank you for buying in our store.").send_email 
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
  
  def no_tax?
    [:book].include? @items.first.product.type   
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
  attr_reader :name, :email
  
  def initialize(name:, email:)
    @name = name
    @email = email
  end
end

class Membership
  attr_reader :customer
  
  def initialize(customer:, active:)
    @customer = customer
    @active = active
  end
  
  def set_active
    # Send e-mail here
    status = @active ? 'activeted' : 'inactiveted'
    new_mail = Email.new(@customer.email,'Membership',"Your membership is now #{status}.").send_email
  end
end

class TestClass
  attr_reader :payment, :shipment
  
  def initialize(payment, shipment)
    @payment = payment
    @shipment = shipment
  end
  
  def print_test
    p "Customer: #{@payment.order.customer.name}"
    p "Item type: #{@payment.order.items.first.product.type}"
    p "Paid: #{@payment.paid?}"
    p "Label printed: #{@shipment.has_label?}"
    p "Membership: #{@shipment.has_membership?}"
    p "#{@shipment.finish}"
  end
end

# Products
phone = Product.new(name: 'Gorgeous cellphone', type: :physical)
book = Product.new(name: 'Awesome book', type: :book)
digital = Product.new(name: 'Amazing digital', type: :digital)
membership = Product.new(name: 'Incredible membership', type: :membership)
other = Product.new(name: 'Terrific other', type: :other)

# Customers
peter = Customer.new(name: 'Peter', email: 'peter@email.com')
mike = Customer.new(name: 'Mike', email: 'mike@email.com')
celina = Customer.new(name: 'Celina', email: 'celina@email.com') 

# Physical Order
phone_order = Order.new(peter)
phone_order.add_product(phone)
payment_phone = Payment.new(order: phone_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_phone.pay
shipping_phone = Shipment.new(payment_phone)
shipping_phone.finish
test_physical_order = TestClass.new(payment_phone,shipping_phone).print_test
# < Peter
# < physical
# < true
# < true
# < false
# < 45678-979

p '---'

# Membership Order
membership_order = Order.new(mike)
membership_order.add_product(membership)
payment_membership = Payment.new(order: membership_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_membership.pay
shipping_membership = Shipment.new(payment_membership)
shipping_membership.finish
test_membership_order = TestClass.new(payment_membership,shipping_membership).print_test
# < Mike
# < membership
# < true
# < false
# < true
# < E-mail sent to:

p '---'

# Book Order
book_order = Order.new(celina)
book_order.add_product(book)
payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
shipping_book = Shipment.new(payment_book)
shipping_book.finish
test_book_order = TestClass.new(payment_book,shipping_book).print_test
# < Celina
# < book
# < true
# < true
# < false
# < 45678-979 - No taxes according to Const. Art. 150, VI, d.

p '---'

# Digital Order
digital_order = Order.new(peter)
digital_order.add_product(digital)
payment_digital = Payment.new(order: digital_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_digital.pay
shipping_digital = Shipment.new(payment_digital)
shipping_digital.finish
test_book_order = TestClass.new(payment_digital,shipping_digital).print_test
# < Peter
# < digital
# < true
# < false
# < false
# < To: peter@email.com - Subject: Midia Order - Text: Hi Peter, your order of Amazing digital is now complete. Please, receive this $10 gift card (No.18821) as our thank you for buying in our store.
