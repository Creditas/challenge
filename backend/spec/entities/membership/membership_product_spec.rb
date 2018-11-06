RSpec.describe MembershipProduct do
  describe "#initialize" do
    context "when creating a new instance" do
      it "product must be filled" do
        membership_product = MembershipProduct.new(product)

        expect(membership_product.product).to be_truthy
      end
    end
  end
end

def product
  Product.new(name: 'some product', type: :membership, price: 5.00)
end