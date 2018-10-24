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

    it "initializes #digital_medias" do
      name = "name"
      email = "example@test.com"
      address = double("Address")

      customer = described_class.new(name: name, email: email, address: address)

      expect(customer.digital_medias).to match_array([])
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

    it "initializes #notification" do
      name = "name"
      email = "example@test.com"
      address = double("Address")

      customer = described_class.new(name: name, email: email, address: address)

      expect(customer.notifications).to match_array([])
    end
  end

  describe "#add_digital_media" do
    it "adds digital_media to customer" do
      name = "name"
      email = "example@test.com"
      address = double("Address")
      digital_media = double("digital_media")

      customer = described_class.new(name: name, email: email, address: address)
      customer.add_digital_media(digital_media)

      expect(customer.digital_medias).to include(digital_media)
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
      notification = double("Notification")

      customer = described_class.new(name: name, email: email, address: address)
      customer.add_notification(notification)

      expect(customer.notifications).to include(notification)
    end
  end

  describe "#add_voucher" do
    it "adds membership to customer" do
      name = "name"
      email = "example@test.com"
      address = double("Address")
      voucher = double("voucher")

      customer = described_class.new(name: name, email: email, address: address)
      customer.add_voucher(voucher)

      expect(customer.vouchers).to include(voucher)
    end
  end
end
