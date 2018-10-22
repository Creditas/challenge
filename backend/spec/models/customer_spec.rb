require "spec_helper"

RSpec.describe Customer do
  describe "#initialize" do
    it "sets #address" do
      address = double("Address")

      customer = described_class.new(address: address)

      expect(customer.address).to eq(address)
    end
  end
end
