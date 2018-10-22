require "spec_helper"

RSpec.describe Product::BasicProduct do
  describe "#initialize" do
    it "sets #name" do
      name = "product 1"
      type = :physical
      price = 10.0

      product = described_class.new(name: name, type: type, price: price)

      expect(product.name).to eq(name)
    end

    it "sets #type" do
      name = "product 2"
      type = :book
      price = 20.0

      product = described_class.new(name: name, type: type, price: price)

      expect(product.type).to eq(type)
    end

    it "sets #price" do
      name = "product 3"
      type = :digital
      price = 30.0

      product = described_class.new(name: name, type: type, price: price)

      expect(product.price).to eq(price)
    end
  end

  describe "#tax_exempt?" do
    it "returns false" do
      name = "product 4"
      type = :membership
      price = 40.0

      product = described_class.new(name: name, type: type, price: price)

      expect(product.tax_exempt?).to be false
    end
  end
end
