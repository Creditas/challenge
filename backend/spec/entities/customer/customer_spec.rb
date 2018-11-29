RSpec.describe Customer do
  describe "#initialize" do
    context "when creating a new instance" do
      it "billing_address must be filled" do
        customer = Customer.new(address, address, 'customer@email.com')

        expect(customer.billing_address).to be_truthy
      end
      it "shipping_address must be filled" do
        customer = Customer.new(address, address, 'customer@email.com')

        expect(customer.shipping_address).to be_truthy
      end
      it "email must be filled" do
        customer = Customer.new(address, address, 'customer@email.com')

        expect(customer.email).to be_truthy
      end
    end
  end
end

def address
  Address.new(zipcode: '45678-979')
end