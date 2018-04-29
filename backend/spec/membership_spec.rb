require 'spec_helper'

describe Membership do
  before do
    foolano = Customer.new(name: "Gabriel", email: "gabrieljustware@gmail.com")
    @order = Order.new(foolano)
  end

  it "ships a book item of an order" do
    membership = Membership.new(name: "Membership for creditas service", value: 10, customer: @order.customer)
    @order.add_item(membership)

    expect(membership).to receive(:activate_customer_membership)
    expect(membership).to receive(:send_order_item_description_email_to_customer).with(@order)
    membership.ship(@order)
  end
end
