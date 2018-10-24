require "spec_helper"

RSpec.describe EmailNotification do
  describe "#initialize" do
    it "sets #customer" do
      customer = double("Customer", email: "example@test.com")

      notification = described_class
                     .new(customer: customer, subject: "", body: "")

      expect(notification.customer).to eq(customer)
    end

    it "sets #recipient" do
      customer = double("Customer", email: "example@test.com")

      notification = described_class
                     .new(customer: customer, subject: "", body: "")

      expect(notification.recipient).to eq(customer.email)
    end

    it "sets #subject" do
      customer = double("Customer", email: "example@test.com")
      subject = "title"

      notification = described_class
                     .new(customer: customer, subject: subject, body: "")

      expect(notification.subject).to eq(subject)
    end

    it "sets #body" do
      customer = double("Customer", email: "example@test.com")
      body = "text message"

      notification = described_class
                     .new(customer: customer, subject: "", body: body)

      expect(notification.body).to eq(body)
    end
  end

  describe "#send" do
    it "adds notification to the customer" do
      customer = double("Customer", email: "example@test.com")

      notification = described_class
                     .new(customer: customer, subject: "", body: "")
      allow(customer).to receive(:add_notification).with(notification)
      result = notification.send

      expect(customer).to have_received(:add_notification).with(notification)
    end
  end
end
