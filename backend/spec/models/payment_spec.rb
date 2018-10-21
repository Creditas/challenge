require "spec_helper"
require "timecop"

RSpec.describe Payment do
  describe "#initialize" do
    it "sets #authorization_number if it is present on arg attributes" do
      attributes = { authorization_number: 123456789 }

      payment = described_class.new(attributes)

      expect(payment.authorization_number)
        .to eq(attributes[:authorization_number])
    end

    it "sets #amount if it is presente on arg attributes" do
      attributes = { amount: 100.0 }

      payment = described_class.new(attributes)

      expect(payment.amount).to eq(attributes[:amount])
    end

    it "sets #invoice if it is present on arg attributes" do
      attributes = { invoice: double("Invoice") }

      payment = described_class.new(attributes)

      expect(payment.invoice).to eq(attributes[:invoice])
    end

    it "sets #order if it is present on arg attributes" do
      attributes = { order: double("Order") }

      payment = described_class.new(attributes)

      expect(payment.order).to eq(attributes[:order])
    end

    it "sets #payment_method if it is present on arg attributes" do
      attributes = { payment_method: double("CreditCard") }

      payment = described_class.new(attributes)

      expect(payment.payment_method).to eq(attributes[:payment_method])
    end
  end

  describe "#pay" do
    it "sets #amount to order total amount" do
      order = instance_double(Order, total_amount: 200.0, address: "address")

      allow(order).to receive(:close).with(any_args)
      allow(Invoice).to receive(:new).with(any_args)

      payment = described_class.new(order: order)
      payment.pay

      expect(payment.amount).to eq(order.total_amount)
    end

    it "sets #authorization_number to current time integer" do
      Timecop.freeze(Time.new(2018, 10, 21, 18, 30))
      order = instance_double(Order, total_amount: 200.0, address: "address")

      allow(order).to receive(:close).with(any_args)
      allow(Invoice).to receive(:new).with(any_args)

      payment = described_class.new(order: order)
      payment.pay

      expect(payment.authorization_number).to eq(Time.now.to_i)
    end

    it "sets #invoice to a new Invoice instance" do
      order = instance_double(Order, total_amount: 200.0, address: "address")
      invoice = instance_double(Invoice)

      allow(order).to receive(:close).with(any_args)
      allow(Invoice).to receive(:new)
        .with(billing_address: order.address,
              shipping_address: order.address,
              order: order)
        .and_return(invoice)

      payment = described_class.new(order: order)
      payment.pay

      expect(payment.invoice).to eq(invoice)
    end

    it "sets #paid_at to current time if argument not passed" do
      Timecop.freeze(Time.new(2018, 10, 21, 18, 30))
      order = instance_double(Order, total_amount: 200.0, address: "address")

      allow(order).to receive(:close).with(any_args)
      allow(Invoice).to receive(:new).with(any_args)

      payment = described_class.new(order: order)
      payment.pay

      expect(payment.paid_at).to eq(Time.now)
    end

    it "sets #paid_at to argument if one has been passed" do
      order = instance_double(Order, total_amount: 200.0, address: "address")
      paid_at = Time.new(2018, 10, 21, 17, 30)

      allow(order).to receive(:close).with(any_args)
      allow(Invoice).to receive(:new).with(any_args)

      payment = described_class.new(order: order)
      payment.pay(paid_at)

      expect(payment.paid_at).to eq(paid_at)
    end

    it "closes the order associated to the payment" do
      order = instance_double(Order, total_amount: 200.0, address: "address")
      paid_at = Time.new(2018, 10, 21, 17, 30)

      allow(order).to receive(:close).with(paid_at).and_return(paid_at)
      allow(Invoice).to receive(:new).with(any_args)

      payment = described_class.new(order: order)
      payment.pay(paid_at)

      expect(order).to have_received(:close).with(paid_at)
    end
  end

  describe "#paid?" do
    it "returns true if payment has been made" do
      order = instance_double(Order, total_amount: 200.0, address: "address")

      allow(order).to receive(:close).with(any_args)
      allow(Invoice).to receive(:new).with(any_args)

      payment = described_class.new(order: order)
      payment.pay

      expect(payment.paid?).to be true
    end

    it "returns false if payment has not been made" do
      order = double("Order")

      payment = described_class.new(order: order)

      expect(payment.paid?).to be false
    end
  end
end
