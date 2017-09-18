require 'rspec'
require 'require_all'
require_all 'lib'

RSpec.describe Product, "#price" do
  context "with products" do
    it "check correct price" do
      product = Product.new(name: 'Galaxy Edge', price: 1890, type: 'physical')
      expect(product.price).to eq 1890
    end
  end
end

