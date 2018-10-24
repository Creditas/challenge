require "spec_helper"

RSpec.describe "Customer orders membership" do
  it "Order is correctly processed" do
    current_time = Time.new(2018, 10, 23, 22, 30)
    address = Address.new(zipcode: "98765-432")
    customer = Customer
               .new(name: "Jane",
                    email: "jane@jane.org",
                    address: address)

    membership = Product::Membership.new(name: "Video Streaming", price: 8.0)
    order = Order.new(customer)
    order.add_product(membership)

    payment = Payment.new(
      order: order,
      payment_method: CreditCard.fetch_by_hashed("098765432-12345678")
    )
    payment.pay(current_time)

    # Product expectations
    expect(membership.type).to eq(:membership)

    # Order expectation
    expect(order.total_amount).to eq(membership.price)
    expect(order.closed_at).to eq(payment.paid_at)

    # Order item expectations
    order_item = order.items.first
    expect(order.items.count).to eq(1)
    expect(order_item).to be_instance_of(OrderItem::Membership)
    expect(order_item.product).to be(membership)
    expect(order_item.quantity).to eq(1)
    expect(order_item.order).to be(order)
    expect(order_item.processed?).to be true

    # Membership expectations
    customer_membership = customer.memberships.first
    expect(customer.memberships.count).to eq(1)
    expect(customer_membership).to be_instance_of(Membership)
    expect(customer_membership.order).to be(order)
    expect(customer_membership.product).to be(membership)
    expect(customer_membership.enabled?).to be true

    # Email notification expectactions
    notification = customer.notifications.first
    expect(customer.notifications.count).to eq(1)
    expect(notification.customer).to be(customer)
    expect(notification.recipient).to eq(customer.email)
    expect(notification.subject).to match(/assinatura.+ativada/)
    expect(notification.subject).to match(/#{membership.name}/)
    expect(notification.body).not_to be_empty

    # Payment expectations
    expect(payment.order).to be(order)
    expect(payment.amount).to eq(membership.price)
    expect(payment.authorization_number).to eq(Time.now.to_i)
    expect(payment.invoice).not_to be nil
    expect(payment.paid_at).to eq(current_time)
    expect(payment.paid?).to be true

    # Invoice expectations
    expect(payment.invoice.billing_address).to be(customer.address)
    expect(payment.invoice.shipping_address).to be(customer.address)
    expect(payment.invoice.order).to be(order)
  end
end

