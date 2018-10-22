require "spec_helper"

RSpec.describe Address do
  describe "#initialize" do
    it "sets #zipcode" do
      zipcode = "12345-678"

      address = described_class.new(zipcode: zipcode)

      expect(address.zipcode).to eq(zipcode)
    end
  end

  describe "#to_s" do
    it "returns an address format text" do
      zipcode = "098-76543"

      address = described_class.new(zipcode: zipcode)

      expect(address.to_s)
        .to eq("Rua: Abcd, No.: 123\nCEP: #{zipcode}\nCidade: Efgh, Estado: IJ")
    end
  end
end
