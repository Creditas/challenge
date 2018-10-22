require "spec_helper"

RSpec.describe Product do
  describe "#initialize" do
    it "sets #name" do
      name = "product"
      type = :book

      product = described_class.new(name: name, type: type)

      expect(product.name).to eq(name)
    end

    it "sets #product" do
      name = "product"
      type = :physical

      product = described_class.new(name: name, type: type)

      expect(product.type).to eq(type)
    end
  end
end
