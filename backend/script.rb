require_relative 'bootstrap'
require_relative 'checkout'
require_relative 'event_dispatcher'
require_relative 'notification'
require_relative 'sales'
require_relative 'sales_actions'
require_relative 'sales_conditions'
require_relative 'sales_discounts'
require_relative 'sales_rules'
require_relative 'shipping'
require_relative 'taxes'

###############################################################################
# REGISTERING SERVICES
###############################################################################

# Very simple implementation of an event dispatcher
event_dispatcher = EventDispatcher.new

# We should centralize all sales rules the business requires into
# some kind of sales rules manager.
sales_rules = Sales::Rules::Manager.new do |manager|
  # Challenge's 4th requirement states we need do apply a discount of
  # $10 to digital products:
  discount = Sales::Discounts::FixedDiscount.new(10)

  # This discount should be applied only to digital products within
  # the order:
  action = Sales::Actions::ApplyDiscount.new(discount) do |items|
    items.select { |item| item.product.is_a? DigitalProduct }
  end

  # Sales rules are executed against an order, so we need to make
  # sure there are digital products within the order. We can do
  # this kind of validation using conditions, such as this one:
  conditions = [Sales::Conditions::HasDigitalProduct.new]

  # Now we put it all together and add it to the manager:
  manager << Sales::Rules::Rule.new(
      name: 'Apply discount for digital products',
      action: action,
      conditions: conditions
  )
end

membership_service = MembershipService.new(event_dispatcher)
shipping_service = Shipping::Service.new(Taxes::Service.new)
payment_service = PaymentService.new(InvoiceFactory.new)
checkout_service = Checkout.new(sales_rules)

notification_service = NotificationService.new(
    email_factory: EmailFactory.new,
    email_provider: EmailProvider.new
)

sales_service = Sales::Service.new(
    checkout: checkout_service,
    payment_service: payment_service,
    event_dispatcher: event_dispatcher
)

###############################################################################
# REGISTERING EVENTS
###############################################################################

# Once an order is successfully received, we can proceed to
# charge it.
event_dispatcher.listen_to :order_received do |context|
  context[:payment] = payment_service.charge(context[:payment])

  event_dispatcher.dispatch(:order_approved, context)
end

# Once an order is approved, we can send to the customer
# a notification
event_dispatcher.listen_to :order_approved do |context|
  notification_service.notify(
      notification_type: :order_approved,
      name: context[:payment].order.customer.name,
      email: context[:payment].order.customer.email,
      variables: { order: context[:payment].order },
  )
end

# Also, when the order is approved, we generate the
# shipping label.
event_dispatcher.listen_to :order_approved do |context|
  # Well, since we aren't able to physically ship any
  # virtual products (includes memberships), we'll remove
  # then from our `shippable_items` list before proceed.
  shippable_items = context[:payment].order.items.select do |item|
    !item.product.is_a? VirtualProduct
  end

  # We could have an order containing only virtual products. In that
  # case wouldn't be necessary to generate labels.
  unless shippable_items.empty?
    shipping_service.generate_label(
        order: context[:payment].order,
        shippable_items: shippable_items
    )
  end
end

# When a order is approved, we look into it after
# memberships. If there's any, then we activate them.
event_dispatcher.listen_to :order_approved do |context|
  # Selecting all order items which has a product of type Membership.
  membership_items = context[:payment].order.items.select do |item|
    item.product.is_a? Membership
  end

  # Now we map the Memberships out of those order items.
  memberships = membership_items.map(&:product)

  memberships.each do |membership|
    membership_service.activate(
      customer: context[:payment].order.customer,
      membership: membership
    )
  end
end

# When a membership is activated we send information regarding
# it to the customer.
event_dispatcher.listen_to :membership_activated do |context|
  notification_service.notify(
    notification_type: :membership_activated,
    name: context[:customer].name,
    email: context[:customer].email,
    variables: context
  )
end

# We also notify the costumer when there's a membership deactivation
event_dispatcher.listen_to :membership_deactivated do |context|
  notification_service.notify(
    notification_type: :membership_deactivated,
    name: context[:customer].name,
    email: context[:customer].email,
    variables: context
  )
end

###############################################################################
# INPUT
###############################################################################

john = Customer.new(name: 'John Doe', email: 'john.doe@gmail.com')
johns_address = Address.new(zipcode: '12345-678')
johns_credit_card = CreditCardRepository.find_by_hash('asd65f1a6d5')

order = Order.new(customer: john, address: johns_address)
order.add_product Membership.new(name: 'Coffe Club Membership', price: 25)
order.add_product DigitalProduct.new(name: 'That Awesome Game', price: 50)
order.add_product Product.new(
    name: 'Awesome Book',
    price: 25,
    attributes: { is_book: true }
)

###############################################################################
# PROCESSING THE INPUT
###############################################################################

payment = sales_service.receive(
    order: order,
    payment_method: johns_credit_card
)

puts "Amount paid: $#{payment.amount}"