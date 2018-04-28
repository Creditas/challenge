require_relative "../bootstrap"

class PaymentsCreate
  def self.new_customer
    Customer.new('User test', 'user@test.com', '432432')
  end

  def self.physical
    customer = PaymentsCreate.new_customer
    product = Product.new(name: 'physical', type: :physical)
    order = Order.new(customer)
    order.add_product(product)

    Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  end

  def self.book
    customer = PaymentsCreate.new_customer
    product = Product.new(name: 'book', type: :book)
    order = Order.new(customer)
    order.add_product(product)

    Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  end

  def self.digital
    customer = PaymentsCreate.new_customer
    product = Product.new(name: 'digital', type: :digital)
    order = Order.new(customer)
    order.add_product(product)

    Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  end

  def self.membership
    customer = PaymentsCreate.new_customer
    product = Product.new(name: 'membership', type: :membership)
    order = Order.new(customer)
    membership = Membership.new(:admin)
    order.add_product(product)

    Payment.new(order: order, membership: membership, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  end
end
