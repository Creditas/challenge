require "spec_helper"

RSpec.describe Address do
  describe "#initialize" do
    it "sets #zipcode" do
      zipcode = "12345-678"

      address = described_class.new(zipcode: zipcode)

      expect(address.zipcode).to eq(zipcode)
    end
  end
end
