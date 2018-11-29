RSpec.describe Address do
  describe "#initialize" do
    context "when creating a new instance" do
      it "zipcode must be filled" do
        address = Address.new(zipcode: zipcode)

        expect(address.zipcode).to be_truthy
      end
    end
  end
end

def zipcode
  '45678-979'
end