require "spec_helper"

RSpec.describe Product::DigitalMedia do
  it "is a kind of Product::BasicProduct" do
    name = "movie"
    price = 8.99

    digital_media = described_class.new(name: name, price: price)

    expect(digital_media).to be_kind_of(Product::BasicProduct)
  end

  describe "#initialize" do
    it "sets #type (inherited) to :digital" do
      name = "song"
      price = 2.99

      digital_media = described_class.new(name: name, price: price)

      expect(digital_media.type).to eq(:digital)
    end
  end
end
