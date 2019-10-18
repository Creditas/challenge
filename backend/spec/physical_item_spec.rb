require 'spec_helper'

describe PhysicalItem do
  before do
    foolano = Customer.new(name: "Gabriel", email: "gabrieljustware@gmail.com")
    @order = Order.new(foolano)
  end

  it "ships a book item of an order" do
    physical_item = PhysicalItem.new(name: "Awesome physical item", value: 10)
    @order.add_item(physical_item)

    ship = physical_item.ship(@order)
    expect(ship).to eq(@order.address.zipcode + " label")
  end
end
