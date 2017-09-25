require 'rspec'
require 'require_all'
require_all 'lib'

RSpec.describe Product do
  context "in order to check product behavior" do
    it "check correct price" do
      product = Product.new(name: 'Galaxy Edge', price: 1890, type: 'physical')
      expect(product.price).to eq 1890
    end

    it "check it can create invalid product" do
      expect {
        raise ProductFactory.create(name: 'Tesouro SELIC', price: 1500, type: 'public_letter')
      }.to raise_error(ArgumentError)
    end
  end
end

