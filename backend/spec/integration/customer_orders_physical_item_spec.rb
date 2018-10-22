require "spec_helper"

RSpec.describe "Customer orders physical item" do
  it "Order is correctly processed" do
    current_time = Time.new(2018, 10, 22, 22, 30)
    address = Address.new(zipcode: "01928-374")
    customer = Customer
               .new(name: "John",
                    email: "john@john.org",
                    address: address)

    cellphone = Product::PhysicalProduct.new(name: "Nasa JPT", price: 1000.0)
    order = Order.new(customer)
    order.add_product(cellphone)

    payment = Payment.new(
      order: order,
      payment_method: CreditCard.fetch_by_hashed("12345678-098765432")
    )
    payment.pay(current_time)

    # Product expectations
    expect(cellphone.type).to eq(:physical)

    # Order expectation
    expect(order.total_amount).to eq(cellphone.price)
    expect(order.closed_at).to eq(payment.paid_at)

    # Order item expectations
    order_item = order.items.first
    expect(order.items.count).to eq(1)
    expect(order_item).to be_instance_of(OrderItem::PhysicalItem)
    expect(order_item.product).to be(cellphone)
    expect(order_item.quantity).to eq(1)
    expect(order_item.order).to be(order)
    expect(order_item.processed?).to be true

    # Order item shipping label expectactions
    expect(order_item.shipping_label).not_to be nil
    expect(order_item.shipping_label).to match(/#{customer.name}/)
    expect(order_item.shipping_label).to match(/#{address.zipcode}/)

    # Payment expectations
    expect(payment.order).to be(order)
    expect(payment.amount).to eq(cellphone.price)
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
