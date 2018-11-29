RSpec.describe Membership do
  describe "#initialize" do
    context "when creating a new instance" do
      it "status must be :pending" do
        membership = Membership.new(product, customer, invoice)

        expect(membership.status).to eq :pending
      end
      it "product must be filled" do
        membership = Membership.new(product, customer, invoice)

        expect(membership.product).to be_truthy
      end
      it "customer must be filled" do
        membership = Membership.new(product, customer, invoice)

        expect(membership.customer).to be_truthy
      end
      it "invoice must be filled" do
        membership = Membership.new(product, customer, invoice)

        expect(membership.invoice).to be_truthy
      end
      it "activated_at must be nil" do
        membership = Membership.new(product, customer, invoice)

        expect(membership.activated_at).to be_falsey
      end
    end
  end
  describe "#activate" do
    context "after activating a membership" do
      it "status must be :activated" do
        membership = Membership.new(product, customer, invoice)
        membership.activate

        expect(membership.status).to eq :activated
      end
      it "activated_at must be filled" do
        membership = Membership.new(product, customer, invoice)
        membership.activate
        
        expect(membership.activated_at).to be_truthy
      end
    end
  end
end

def invoice
  Invoice.new(Order.new(customer), customer)
end

def customer
  Customer.new(Address.new(zipcode: '45678-979'), Address.new(zipcode: '45678-979'), 'customer@email.com')
end

def product
  Product.new(name: 'some product', type: :membership, price: 5.00)
end