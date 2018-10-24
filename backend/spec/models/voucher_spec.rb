require "spec_helper"

RSpec.describe Voucher do
  describe "#initialize" do
    it "sets #value" do
      value = 50.0
      payment = double("payment")

      voucher = described_class.new(value: value, payment: payment)

      expect(voucher.payment).to be(payment)
    end

    it "sets #payment" do
      payment = double("payment")

      voucher = described_class.new(value: 15.0, payment: payment)

      expect(voucher.payment).to be(payment)
    end

    it "sets #code" do
      payment = double("payment")

      voucher = described_class.new(value: 20.0, payment: payment)

      expect(voucher.code).to be_instance_of(String)
    end

    it "generates a voucher code with 8 characters" do
      payment = double("payment")

      voucher = described_class.new(value: 5.0, payment: payment)

      expect(voucher.code.size).to eq(8)
    end
  end
end
