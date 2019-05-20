
require_relative '../../lib/config/load'

describe Shipping::ShippingItem do
  describe "Shipping::ShippingItem" do
    before do
      foolano = Customer.new
      @book = Product.new(name: 'Awesome book', type: :book)
      @physical = Product.new(name: 'Notebook', type: :physical)
      @digital = Product.new(name: 'Audio Book', type: :digital)
      @membership = Product.new(name: 'Subscription Book', type: :membership)
      @order = Order.new(foolano)

      @order.add_product(@physical)
      @order.add_product(@book)
      @order.add_product(@digital)
      @order.add_product(@membership)
    end

    it 'dispatch correct physical item' do
      expect_any_instance_of(Shipping::ShippingPhysical).to receive(:dispatch_now)
      Shipping::ShippingItem.new(@order.items[0]).dispatch
    end

    it 'dispatch correct book item' do
      expect_any_instance_of(Shipping::ShippingBook).to receive(:dispatch_now)
      Shipping::ShippingItem.new(@order.items[1]).dispatch
    end

    it 'dispatch correct digital item' do
      expect_any_instance_of(Shipping::ShippingDigital).to receive(:dispatch_now)
      Shipping::ShippingItem.new(@order.items[2]).dispatch
    end

    it 'dispatch correct membership item' do
      expect_any_instance_of(Shipping::ShippingMembership).to receive(:dispatch_now)
      Shipping::ShippingItem.new(@order.items[3]).dispatch
    end
  end
end