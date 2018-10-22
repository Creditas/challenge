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

    it "sets #quantity to defined value if present in args" do
      order = double("Order")
      product = double("Product")
      quantity = 3

      order_item = described_class
                   .new(order: order,
                        product: product,
                        quantity: quantity)

      expect(order_item.quantity).to eq(quantity)
    end

    it "sets #quantity to default value if not present in args" do
      order = double("Order")
      product = double("Product")
      default_quantity = 1

      order_item = described_class.new(order: order, product: product)

      expect(order_item.quantity).to eq(default_quantity)
    end
  end

  describe "#total" do
    it "returns the order item total value" do
      order = double("Order")
      product = double("Product", price: 35.0)
      quantity = 5

      order_item = described_class
                   .new(order: order,
                        product: product,
                        quantity: quantity)

      expect(order_item.total).to eq(quantity * product.price)
    end
  end
end
