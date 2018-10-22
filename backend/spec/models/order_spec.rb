require "spec_helper"
require "timecop"

RSpec.describe Order do
  describe "#initialize" do
    it "sets #customer" do
      customer = double("Customer", address: double("Address"))

      order = described_class.new(customer)

      expect(order.customer).to eq(customer)
    end

    it "initializes #items attribute" do
      customer = double("Customer", address: double("Address"))

      order = described_class.new(customer)

      expect(order.items).to match_array([])
    end

    it "sets @order_item_class to defined value if it is present in args" do
      customer = double("Customer", address: double("Address"))
      item_factory = Hash

      order = described_class.new(customer, item_factory: item_factory)

      expect(order.instance_variable_get(:@item_factory)).to eq(item_factory)
    end

    it "sets @order_item_class to default value if not present in args" do
      customer = double("Customer", address: double("Address"))
      default_item_factory = OrderItem::Factory

      order = described_class.new(customer)

      expect(order.instance_variable_get(:@item_factory))
        .to eq(default_item_factory)
    end

    it "sets #address to defined value if it is present in args" do
      customer = double("Customer", address: double("Address"))
      address = double("Address")

      order = described_class.new(customer, address: address)

      expect(order.address).to eq(address)
    end

    it "sets #address to customer address if not present in args" do
      customer = double("Customer", address: double("Address"))

      order = described_class.new(customer)

      expect(order.address).to eq(customer.address)
    end
  end

  describe "#add_product" do
    it "creates a new order item with quantity if specified" do
      customer = double("Customer", address: double("Address"))
      product = double("Product")
      quantity = 5
      order_item = double("OrderItem")
      item_factory = class_double(OrderItem::Factory)

      order = described_class.new(customer, item_factory: item_factory)

      allow(item_factory).to receive(:build)
        .with(order: order, product: product, quantity: quantity)
        .and_return(order_item)

      order.add_product(product, quantity: quantity)

      expect(item_factory).to have_received(:build)
        .with(order: order, product: product, quantity: quantity)
    end

    it "creates a new order item with nil quantity if not specified" do
      customer = double("Customer", address: double("Address"))
      product = double("Product")
      quantity = 5
      order_item = double("OrderItem")
      item_factory = class_double(OrderItem::Factory)

      order = described_class.new(customer, item_factory: item_factory)

      allow(item_factory).to receive(:build)
        .with(order: order, product: product, quantity: nil)
        .and_return(order_item)

      order.add_product(product)

      expect(item_factory).to have_received(:build)
        .with(order: order, product: product, quantity: nil)
    end

    it "adds created order item to order#items" do
      customer = double("Customer", address: double("Address"))
      product = double("Product")
      order_item = double("OrderItem")
      item_factory = class_double(OrderItem::Factory)

      order = described_class.new(customer, item_factory: item_factory)

      allow(item_factory).to receive(:build)
        .with(order: order, product: product, quantity: nil)
        .and_return(order_item)

      order.add_product(product)

      expect(order.items).to include(order_item)
    end
  end

  describe "#total_amount" do
    it "returns 0 if order has no items" do
      customer = double("Customer", address: double("Address"))

      order = described_class.new(customer)

      expect(order.total_amount).to eq(0)
    end

    it "returns the total amount (sum) of all order items" do
      customer = double("Customer", address: double("Address"))
      product = double("Product")
      order_item = double("OrderItem", total: 10)
      item_factory = class_double(OrderItem::Factory)

      allow(item_factory).to receive(:build)
        .with(any_args).and_return(order_item)

      order = described_class.new(customer, item_factory: item_factory)
      3.times { order.add_product(product) }

      expect(order.total_amount).to eq(3 * order_item.total)
    end
  end

  describe "#close" do
    it "process each order item" do
      customer = double("Customer", address: double("Address"))
      item_factory = class_double(OrderItem::Factory)

      order = described_class.new(customer, item_factory: item_factory)

      product1 = double("Product")
      order_item1 = double("OrderItem")
      allow(order_item1).to receive(:process)
      allow(item_factory).to receive(:build)
        .with(order: order, product: product1, quantity: nil)
        .and_return(order_item1)

      order.add_product(product1)

      product2 = double("Product")
      order_item2 = double("OrderItem")
      allow(order_item2).to receive(:process)
      allow(item_factory).to receive(:build)
        .with(order: order, product: product2, quantity: nil)
        .and_return(order_item2)

      order.add_product(product2)

      order.close

      expect(order_item1).to have_received(:process)
      expect(order_item2).to have_received(:process)
    end

    it "sets #closed_at to defined value if argument is passed" do
      customer = double("Customer", address: double("Address"))
      closed_at = Time.new(2018, 10, 21, 20, 30)

      order = described_class.new(customer)
      order.close(closed_at)

      expect(order.closed_at).to eq(closed_at)
    end

    it "sets #closed_at to current time if argument is not passed" do
      Timecop.freeze(Time.new(2018, 10, 21, 21, 30))
      customer = double("Customer", address: double("Address"))

      order = described_class.new(customer)
      order.close

      expect(order.closed_at).to eq(Time.now)
    end
  end
end
