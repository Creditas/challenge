require "spec_helper"

RSpec.describe Customer do
  describe "#initialize" do
    it "sets #name" do
      name = "name"
      email = "example@test.com"
      address = double("Address")

      customer = described_class.new(name: name, email: email, address: address)

      expect(customer.name).to eq(name)
    end

    it "sets #email" do
      name = "name"
      email = "example@test.com"
      address = double("Address")

      customer = described_class.new(name: name, email: email, address: address)

      expect(customer.email).to eq(email)
    end

    it "sets #address" do
      name = "name"
      email = "example@test.com"
      address = double("Address")

      customer = described_class.new(name: name, email: email, address: address)

      expect(customer.address).to eq(address)
    end

    it "initializes #memberships" do
      name = "name"
      email = "example@test.com"
      address = double("Address")

      customer = described_class.new(name: name, email: email, address: address)

      expect(customer.memberships).to match_array([])
    end

    it "initializes #notification" do
      name = "name"
      email = "example@test.com"
      address = double("Address")

      customer = described_class.new(name: name, email: email, address: address)

      expect(customer.notifications).to match_array([])
    end
  end

  describe "#add_membership" do
    it "adds membership to customer" do
      name = "name"
      email = "example@test.com"
      address = double("Address")
      membership = double("Membership")

      customer = described_class.new(name: name, email: email, address: address)
      customer.add_membership(membership)

      expect(customer.memberships).to include(membership)
    end
  end

  describe "#add_notification" do
    it "adds membership to customer" do
      name = "name"
      email = "example@test.com"
      address = double("Address")
      notification = double("notification")

      customer = described_class.new(name: name, email: email, address: address)
      customer.add_notification(notification)

      expect(customer.notifications).to include(notification)
    end
  end
end
