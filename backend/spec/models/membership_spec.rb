require "spec_helper"

RSpec.describe Membership do
  describe "#initialize" do
    it "sets #order" do
      order = double("Order")
      product = double("Product")

      membership = described_class.new(order: order, product: product)

      expect(membership.order).to eq(order)
    end

    it "sets #product" do
      order = double("Order")
      product = double("Product")

      membership = described_class.new(order: order, product: product)

      expect(membership.product).to eq(product)
    end

    it "initializes membership as disabled" do
      order = double("Order")
      product = double("Product")

      membership = described_class.new(order: order, product: product)

      expect(membership.enabled?).to be false
    end
  end

  describe "#enable!" do
    it "sets membership as enabled" do
      order = double("Order")
      product = double("Product")

      membership = described_class.new(order: order, product: product)
      membership.enable!

      expect(membership.enabled?).to be true
    end
  end

  describe "#enabled?" do
    it "returns true if membership has been enabled" do
      order = double("Order")
      product = double("Product")

      membership = described_class.new(order: order, product: product)
      membership.enable!

      expect(membership.enabled?).to be true
    end

    it "returns false if membership has not been enables" do
      order = double("Order")
      product = double("Product")

      membership = described_class.new(order: order, product: product)

      expect(membership.enabled?).to be false
    end
  end
end
