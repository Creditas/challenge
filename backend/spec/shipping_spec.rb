require 'spec_helper'

describe Shipping do
  before :each do
    foolano = Customer.new(name: "Gabriel", email: "gabrieljustware@gmail.com")
    order = Order.new(foolano)
    @payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  end

  it "ships a physical item" do
    shipping = Shipping.new
    physical = Product.new(name: 'Awesome physical item', type: :physical)
    @payment.order.add_product(physical)

    expect(shipping).to receive(:print_shipping_label).with(:physical, @payment.order.address.zipcode)
    shipping.ship(@payment)
  end

  it "ships a membership item" do
    shipping = Shipping.new
    membership = Membership.new(customer: @payment.order.customer, type: :membership)
    @payment.order.add_product(membership)

    expect(@payment.order.items.first.product).to receive(:activate_customer_membership)
    expect(@payment.order.items.first).to receive(:send_order_item_description_email_to_customer)
    shipping.ship(@payment)
  end

  it "ships a book item" do
    shipping = Shipping.new
    book = Product.new(name: 'Awesome book', type: :book)
    @payment.order.add_product(book)

    expect(shipping).to receive(:print_shipping_label).with(:book, @payment.order.address.zipcode)
    shipping.ship(@payment)
  end

  it "ships a digital item" do
    shipping = Shipping.new
    digital = Product.new(name: 'Awesome digital item', type: :digital)
    @payment.order.add_product(digital)

    expect(@payment.order.items.first).to receive(:send_order_item_description_email_to_customer)
    expect(@payment).to receive(:grant_discount_voucher)
    shipping.ship(@payment)
  end

  it "prints shipping label for physical item" do
    shipping = Shipping.new
    shipping_label = shipping.print_shipping_label(:physical, "12345678")
    expect(shipping_label).to eq("12345678")
  end

  it "prints shipping label for book item" do
    shipping = Shipping.new
    shipping_label = shipping.print_shipping_label(:book, "12345678")
    expect(shipping_label).to eq("12345678 Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.")
  end
end
