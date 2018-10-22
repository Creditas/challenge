require "spec_helper"

RSpec.describe OrderItem do
  describe "#initialize" do
    it "sets #order" do
      order = double("Order")
      product = double("Product")

      order_item = described_class.new(order: order, product: product)

      expect(order_item.order).to eq(order)
    end

    it "sets #product" do
      order = double("Order")
      product = double("Product")

      order_item = described_class.new(order: order, product: product)

      expect(order_item.product).to eq(product)
    end
  end

  describe "#total" do
    it "returns the order item total value" do
      # The original OrderItem class implementation returns the hard-coded value
      # of 10 (integer) for the #total attribute (each item worths 10)

      order = double("Order")
      product = double("Product")

      order_item = described_class.new(order: order, product: product)

      expect(order_item.total).to eq(10)
    end
  end
end
