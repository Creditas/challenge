require "spec_helper"

RSpec.describe CreditCard do
  describe "#fetch_by_hashed" do
    it "returns a new CreditCard instance" do
      credit_card = described_class.fetch_by_hashed("a676hjh24kn2mk2")

      expect(credit_card).to be_instance_of(described_class)
    end
  end
end
