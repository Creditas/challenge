require "spec_helper"

RSpec.describe Product::PhysicalProduct do
  it "is a kind of Product::BasicProduct" do
    name = "physical"
    price = 15.0

    product = described_class.new(name: name, price: price)

    expect(product).to be_kind_of(Product::BasicProduct)
  end

  describe "#initialize" do
    it "sets #type (inherited) to :physical (default) if not specified" do
      name = "physical"
      price = 25.0

      product = described_class.new(name: name, price: price)

      expect(product.type).to eq(:physical)
    end

    it "sets #type (inherited) to defined value if present in args" do
      name = "book"
      type = :book
      price = 35.0

      product = described_class.new(name: name, type: type, price: price)

      expect(product.type).to eq(type)
    end
  end
end
