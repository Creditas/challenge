require "spec_helper"

RSpec.describe Product::PhysicalBook do
  it "is a kind of Product::PhysicalProduct" do
    name = "book"
    price = 15.0

    physical_book = described_class.new(name: name, price: price)

    expect(physical_book).to be_kind_of(Product::PhysicalProduct)
  end

  describe "#initialize" do
    it "sets #type (inherited) to :physical" do
      name = "book"
      price = 25.0

      physical_book = described_class.new(name: name, price: price)

      expect(physical_book.type).to eq(:book)
    end
  end

  describe "#tax_information" do
    it "returns tax exemption information for books" do
      name = "book"
      price = 35.0

      physical_book = described_class.new(name: name, price: price)

      expect(physical_book.tax_information).to eq(
        "Isento de impostos conforme disposto na Constituicao Art. 150, VI, d."
      )
    end
  end
end
