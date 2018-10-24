require "spec_helper"

RSpec.describe OrderItem::DigitalMedia do
  it "is a kind of OrderItem::Item" do
    order = double("Order")
    product = double("Product")

    digital_media = described_class.new(order: order, product: product)

    expect(digital_media).to be_kind_of(OrderItem::Item)
  end

  describe "#process" do
    it "adds digital_media to customer" do
      order = double("Order")
      product = double("Product", name: "Video Digital")
      customer = double("Customer", email: "example@test.com")
      allow(customer).to receive(:add_digital_media).with(product)

      digital_media_item = described_class.new(order: order, product: product)
      allow(digital_media_item).to receive(:customer).and_return(customer)
      allow(digital_media_item).to receive(:generate_new_voucher)
      allow(digital_media_item).to receive(:send_email_notification)

      digital_media_item.process

      expect(customer).to have_received(:add_digital_media).with(product)
    end

    it "generates a new voucher" do
      order = double("Order")
      product = double("Product", name: "Video Digital")
      payment = double("Payment")
      voucher_value = 10.0

      voucher = double("Voucher")
      allow(Voucher).to receive(:new)
        .with(value: voucher_value, payment: payment)
        .and_return(voucher)

      customer = double("Customer", email: "example@test.com")
      allow(customer).to receive(:add_voucher).with(voucher)

      digital_media_item = described_class.new(order: order, product: product)
      allow(digital_media_item).to receive(:customer).and_return(customer)
      allow(digital_media_item).to receive(:payment).and_return(payment)
      allow(digital_media_item).to receive(:add_digital_media_to_customer)
      allow(digital_media_item).to receive(:send_email_notification)

      digital_media_item.process

      expect(customer).to have_received(:add_voucher).with(voucher)
    end

    it "sends email notification" do
      order = double("Order")
      product = double("Product", name: "Video Digital")
      customer = double("Customer", email: "example@test.com")
      payment = double("Payment")
      voucher_value = 10.0

      voucher = double("Voucher", value: voucher_value, code: "VOUCHER1")
      allow(Voucher).to receive(:new)
        .with(value: voucher_value, payment: payment)
        .and_return(voucher)

      customer = double("Customer", email: "example@test.com")
      allow(customer).to receive(:add_voucher).with(voucher)

      notification = double("Notifcation")
      allow(notification).to receive(:send)
      allow(EmailNotification).to receive(:new)
        .with(any_args)
        .and_return(notification)

      digital_media_item = described_class.new(order: order, product: product)
      allow(digital_media_item).to receive(:customer).and_return(customer)
      allow(digital_media_item).to receive(:payment).and_return(payment)
      allow(digital_media_item).to receive(:add_digital_media_to_customer)

      digital_media_item.process

      expect(notification).to have_received(:send)
    end
  end
end
