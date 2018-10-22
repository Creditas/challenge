require "spec_helper"

RSpec.describe OrderItem::Factory do
  describe ".build" do
    it "returns a new item" do
      order = double("Order")
      product = double("Product")

      order_item = described_class.build(order: order, product: product)

      expect(order_item).to be_instance_of(OrderItem::Item)
    end
  end
end
