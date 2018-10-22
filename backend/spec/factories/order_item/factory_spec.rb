require "spec_helper"

RSpec.describe OrderItem::Factory do
  describe ".build" do
    class ElectronicGadget < Product::PhysicalProduct
    end

    it "returns an OrderItem::PhysicalItem if product is physical product" do
      order = double("Order")
      product = ElectronicGadget.new(name: "microwave", price: 300.0)

      order_item = described_class.build(order: order, product: product)

      expect(order_item).to be_instance_of(OrderItem::PhysicalItem)
    end

    it "raises an error if product class is not expected" do
      order = double("Order")
      product = Hash.new

      expect { described_class.build(order: order, product: product) }
        .to raise_error("#{product.class} is not mapped to an Order Item class")
    end
  end
end
