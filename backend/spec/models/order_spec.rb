require "spec_helper"
require "timecop"

RSpec.describe Order do
  describe "#initialize" do
    it "sets #customer" do
      customer = double("Customer")

      order = described_class.new(customer)

      expect(order.customer).to eq(customer)
    end

    it "initializes #items attribute" do
      customer = double("Customer")

      order = described_class.new(customer)

      expect(order.items).to be_empty
    end

    it "sets @order_item_class to defined value if it is present in args" do
      customer = double("Customer")
      item_class = Hash

      order = described_class.new(customer, item_class: item_class)

      expect(order.instance_variable_get(:@order_item_class)).to eq(item_class)
    end

    it "sets @order_item_class to default value if not present in args" do
      customer = double("Customer")
      default_order_item_class = OrderItem

      order = described_class.new(customer)

      expect(order.instance_variable_get(:@order_item_class))
        .to eq(default_order_item_class)
    end

    it "sets #address to defined value if it is present in args" do
      customer = double("Customer")
      address = double("Address")

      order = described_class.new(customer, address: address)

      expect(order.address).to eq(address)
    end

    it "sets #address to default value if not present in args" do
      customer = double("Customer")

      order = described_class.new(customer)

      expect(order.address).to be_instance_of(Address)
    end
  end

  describe "#add_product" do
    it "creates a new order item" do
      customer = double("Customer")
      product = double("Product")
      order_item = double("OrderItem")
      item_class = class_double(OrderItem)

      order = described_class.new(customer, item_class: item_class)

      allow(item_class).to receive(:new)
        .with(order: order, product: product)
        .and_return(order_item)

      order.add_product(product)

      expect(item_class).to have_received(:new)
        .with(order: order, product: product)
    end

    it "adds created order item to order#items" do
      customer = double("Customer")
      product = double("Product")
      order_item = double("OrderItem")
      item_class = class_double(OrderItem)

      order = described_class.new(customer, item_class: item_class)

      allow(item_class).to receive(:new)
        .with(order: order, product: product)
        .and_return(order_item)

      order.add_product(product)

      expect(order.items).to include(order_item)
    end
  end

  describe "#total_amount" do
    it "returns 0 if order has no items" do
      customer = double("Customer")

      order = described_class.new(customer)

      expect(order.total_amount).to eq(0)
    end

    it "returns the total amount (sum) of all order items" do
      customer = double("Customer")
      product = double("Product")

      order = described_class.new(customer)
      3.times { order.add_product(product) }

      # The original OrderItem class implementation returns the hard-coded value
      # of 10 (integer) for the #total attribute (each item worths 10)
      expect(order.total_amount).to eq(30)
    end
  end

  describe "#close" do
    it "sets #closed_at to defined value if argument is passed" do
      customer = double("Customer")
      closed_at = Time.new(2018, 10, 21, 20, 30)

      order = described_class.new(customer)
      order.close(closed_at)

      expect(order.closed_at).to eq(closed_at)
    end

    it "sets #closed_at to current time if argument is not passed" do
      Timecop.freeze(Time.new(2018, 10, 21, 21, 30))
      customer = double("Customer")

      order = described_class.new(customer)
      order.close

      expect(order.closed_at).to eq(Time.now)
    end
  end
end