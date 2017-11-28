require_relative 'email'
require_relative 'membership'
require_relative 'voucher'

class BookCarrier
  def initialize(printer)
    @printer = printer
  end

  def dispatch(order_item)

    order = order_item.order
    shipping_address = order.shipping_address
    recipient = order.customer.name
    observation = 'Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.'
    shipping_label = ShippingLabel.new(recipient, shipping_address, observation)
    @printer.print_label(shipping_label)
  end
end

class PhysicalCarrier
  def initialize(warehouse)
    @printer = warehouse
  end

  def dispatch(order_item)

    order = order_item.order
    shipping_address = order.shipping_address
    recipient = order.customer.name
    shipping_label = ShippingLabel.new(recipient, shipping_address)
    @printer.print_label(shipping_label)
  end
end

class SubscriptionCarrier

  def initialize(email_service, memberships)
    @email_service = email_service
    @memberships = memberships
  end

  def dispatch(order_item)

    membership = Membership.new(order_item.order.customer, order_item.product)
    @memberships.save(membership)

    email_address = order_item.order.customer.email_address
    subject = 'Subscription activated'
    content = "Your #{order_item.product.name} subscription has been activated!"
    @email_service.send(Email.new(email_address, subject, content))
  end
end

class DigitalCarrier

  def initialize(email_service, vouchers)
    @email_service = email_service
    @vouchers  = vouchers
  end

  def dispatch(order_item)
    order = order_item.order

    voucher = Voucher.new(order.customer, 10)
    @vouchers.save(voucher)

    email_address = order.customer.email_address
    subject = 'Purchase'
    content = "You purchased  #{order_item.amount}x #{order_item.product.name}(s) with success!"
    @email_service.send(Email.new(email_address, subject, content))
  end
end

class ShippingLabel

  attr_reader :recipient, :address, :observations

  def initialize(recipient, address, observations ='')
    @recipient = recipient
    @address = address
    @observations = observations
  end
end