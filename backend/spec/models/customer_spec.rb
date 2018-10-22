require "spec_helper"

RSpec.describe Customer do
  describe "#initialize" do
    it "sets #name" do
      name = "name"
      address = double("Address")

      customer = described_class.new(name: name, address: address)

      expect(customer.name).to eq(name)
    end

    it "sets #address" do
      name = "name"
      address = double("Address")

      customer = described_class.new(name: name, address: address)

      expect(customer.address).to eq(address)
    end
  end
end
