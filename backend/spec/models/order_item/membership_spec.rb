require "spec_helper"

RSpec.describe OrderItem::Membership do
  it "is a kind of OrderItem::Item" do
    order = double("Order")
    product = double("Product")

    membership = described_class.new(order: order, product: product)

    expect(membership).to be_kind_of(OrderItem::Item)
  end

  describe "#process" do
    def mocked_membership_item(customer:, notification:)
      order = double("Order")
      product = double("Product", name: "Jogo Online")

      allow(EmailNotification).to receive(:new)
        .with(any_args)
        .and_return(notification)

      instance = described_class.new(order: order, product: product)
      allow(instance).to receive(:customer).and_return(customer)

      instance
    end

    it "creates a new membership" do
      membership = double("Membership")
      allow(membership).to receive(:enable!)
      allow(Membership).to receive(:new).with(any_args).and_return(membership)

      customer = double("Customer", email: "example@test.com")
      allow(customer).to receive(:add_membership).with(membership)

      notification = double("Notifcation")
      allow(notification).to receive(:send)

      membership_item = mocked_membership_item(customer: customer,
                                               notification: notification)
      membership_item.process

      expect(Membership).to have_received(:new).with(any_args)
    end

    it "adds new membership to the customer" do
      membership = double("Membership")
      allow(membership).to receive(:enable!)
      allow(Membership).to receive(:new).with(any_args).and_return(membership)

      customer = double("Customer", email: "example@test.com")
      allow(customer).to receive(:add_membership).with(membership)

      notification = double("Notifcation")
      allow(notification).to receive(:send)

      membership_item = mocked_membership_item(customer: customer,
                                               notification: notification)
      membership_item.process

      expect(customer).to have_received(:add_membership).with(membership)
    end

    it "enables created membership" do
      membership = double("Membership")
      allow(membership).to receive(:enable!)
      allow(Membership).to receive(:new).with(any_args).and_return(membership)

      customer = double("Customer", email: "example@test.com")
      allow(customer).to receive(:add_membership).with(membership)

      notification = double("Notifcation")
      allow(notification).to receive(:send)

      membership_item = mocked_membership_item(customer: customer,
                                               notification: notification)
      membership_item.process

      expect(membership).to have_received(:enable!)
    end

    it "sends email notification to customer" do
      membership = double("Membership")
      allow(membership).to receive(:enable!)
      allow(Membership).to receive(:new).with(any_args).and_return(membership)

      customer = double("Customer", email: "example@test.com")
      allow(customer).to receive(:add_membership).with(membership)

      notification = double("Notifcation")
      allow(notification).to receive(:send)

      membership_item = mocked_membership_item(customer: customer,
                                               notification: notification)
      membership_item.process

      expect(notification).to have_received(:send)
    end
  end
end
