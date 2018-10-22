require "spec_helper"

RSpec.describe Product do
  describe "#initialize" do
    it "sets #name" do
      name = "product 1"
      type = :book
      price = 10.0

      product = described_class.new(name: name, type: type, price: price)

      expect(product.name).to eq(name)
    end

    it "sets #type" do
      name = "product 2"
      type = :physical
      price = 20.0

      product = described_class.new(name: name, type: type, price: price)

      expect(product.type).to eq(type)
    end

    it "sets #price" do
      name = "product 2"
      type = :digital
      price = 30.0

      product = described_class.new(name: name, type: type, price: price)

      expect(product.type).to eq(type)
    end
  end
end
