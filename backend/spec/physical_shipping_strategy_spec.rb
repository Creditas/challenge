require_relative "../bootstrap.rb"

RSpec.describe "Invoking PhysicalShippingStrategy methods" do

  it "should return shipping label for a physical product order" do
    @foolano = Customer.new
    @order = Order.new(@foolano)
    physical = PhysicalShippingStrategy.new

    expect(physical).to receive(:shipping_label)
    physical.shipping(@order)

  end

end
