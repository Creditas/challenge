require "spec_helper"

RSpec.describe Invoice do
  describe "#initialize" do
    it "sets #billing_address if it is present on arg attributes" do
      attributes = { billing_address: "address" }

      invoice = described_class.new(attributes)

      expect(invoice.billing_address).to eq(attributes[:billing_address])
    end

    it "sets #shipping_address if it is present on arg attributes" do
      attributes = { shipping_address: "address" }

      invoice = described_class.new(attributes)

      expect(invoice.shipping_address).to eq(attributes[:shipping_address])
    end

    it "sets #order if it is presend on arg attributes" do
      attributes = { order: double("Order") }

      invoice = described_class.new(attributes)

      expect(invoice.order).to eq(attributes[:order])
    end
  end
end
