require "spec_helper"

RSpec.describe OrderItem::PhysicalItem do
  it "is a kind of OrderItem::Item" do
    order = double("Order")
    product = double("Product")

    physical_item = described_class.new(order: order, product: product)

    expect(physical_item).to be_kind_of(OrderItem::Item)
  end

  describe "#process" do
    def mocked_physical_item(product:, customer_name: "a", address: "b")
      order = double("Order")
      instance = described_class.new(order: order, product: product)

      allow(instance).to receive(:address).and_return(address)
      allow(instance).to receive(:customer_name).and_return(customer_name)

      instance
    end

    it "generates a shipping label w/o tax info when product isn't exempt" do
      address = "address"
      customer_name = "name"
      product = double("Product")
      allow(product).to receive(:tax_exempt?).and_return(false)

      physical_item = mocked_physical_item(
        product: product,
        customer_name: customer_name,
        address: address
      )
      physical_item.process

      expect(physical_item.shipping_label)
        .to eq(customer_name + "\n" + address)
    end

    it "generates a shipping label w/ tax info when product is exempt" do
      address = "address"
      customer_name = "name"
      tax_information = "tax exempt info"
      product = double("Product", tax_information: tax_information)
      allow(product).to receive(:tax_exempt?).and_return(true)

      physical_item = mocked_physical_item(
        product: product,
        customer_name: customer_name,
        address: address
      )
      physical_item.process

      expect(physical_item.shipping_label)
        .to eq(customer_name + "\n" + address + "\n" + tax_information)
    end

    it "sets item as processed" do
      product = double("Product")
      allow(product).to receive(:tax_exempt?).and_return(false)

      physical_item = mocked_physical_item(product: product)
      physical_item.process

      expect(physical_item.processed?).to be true
    end
  end
end
