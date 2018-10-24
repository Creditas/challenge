require "spec_helper"

RSpec.describe Product::Membership do
  it "is a kind of Product::BasicProduct" do
    name = "digital monthly magazine"
    price = 15.0

    membership = described_class.new(name: name, price: price)

    expect(membership).to be_kind_of(Product::BasicProduct)
  end

  describe "#initialize" do
    it "sets #type (inherited) to :membership" do
      name = "online game subscription"
      price = 25.0

      membership = described_class.new(name: name, price: price)

      expect(membership.type).to eq(:membership)
    end
  end
end

