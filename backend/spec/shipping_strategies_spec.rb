require_relative "../bootstrap.rb"

RSpec.describe "testing shipping strategies" do

  context "invoke shipping strategy for product type" do
    it "should return a Physical Shipping for a Physical Product Order" do
      expect( SHIPPING_STRATEGIES[:physical].class).to eq(PhysicalShippingStrategy)
    end

    it "should return a Book Shipping for a Book Order" do
      expect( SHIPPING_STRATEGIES[:book].class).to eq(BookShippingStrategy)
    end

    it "should return a Digital Shipping for a Digital Order" do
      expect( SHIPPING_STRATEGIES[:digital].class).to eq(DigitalShippingStrategy)
    end

    it "should return a Digital Shipping for a Membership Order" do
      expect( SHIPPING_STRATEGIES[:membership].class).to eq(MembershipShippingStrategy)
    end

  end
end
