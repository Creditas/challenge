require "spec_helper"

RSpec.describe OrderItem::Item do
  it "is not processed until further action is taken" do
    order = double("Order")
    product = double("Product")

    order_item = described_class.new(order: order, product: product)

    expect(order_item.processed?).to be false
  end

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

    it "initializes item as not processed" do
      order = double("Order")
      product = double("Product")

      order_item = described_class.new(order: order, product: product)

      expect(order_item.processed?).to be false
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

  describe "#process" do
    it "sets item as processed" do
      order = double("Order")
      product = double("Product")

      order_item = described_class.new(order: order, product: product)
      order_item.process

      expect(order_item.processed?).to be true
    end
  end

  describe "#processed?" do
    it "returns true if item has been processed" do
      order = double("Order")
      product = double("Product")

      order_item = described_class.new(order: order, product: product)
      order_item.process

      expect(order_item.processed?).to be true
    end

    it "returns false if item has not been processed" do
      order = double("Order")
      product = double("Product")

      order_item = described_class.new(order: order, product: product)
      order_item.process

      expect(order_item.processed?).to be true
    end
  end
end
