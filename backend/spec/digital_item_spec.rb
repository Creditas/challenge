require 'spec_helper'

describe DigitalItem do
  before do
    foolano = Customer.new(name: "Gabriel", email: "gabrieljustware@gmail.com")
    @order = Order.new(foolano)
  end

  it "ships a book item of an order" do
    digital_item = DigitalItem.new(name: "Awesome digital item", value: 10)
    @order.add_item(digital_item)

    expect(digital_item).to receive(:send_order_item_description_email_to_customer).with(@order)
    expect(@order).to receive(:grant_discount_voucher)
    digital_item.ship(@order)
  end
end
