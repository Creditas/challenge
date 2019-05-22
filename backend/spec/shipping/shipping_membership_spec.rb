
require_relative '../../lib/config/load'

describe Shipping::ShippingMembership do
  describe "Shipping::ShippingItem" do
    before do
      foolano = Customer.new( 'Foolano')
      @book = Product.new(name: 'Awesome book', type: :book)
      @physical = Product.new(name: 'Notebook', type: :physical)
      @digital = Product.new(name: 'Audio Book', type: :digital)
      @membership = Product.new(name: 'Subscription Book', type: :membership)
      @order = Order.new(foolano)
      @order.add_product(@membership)
    end

    it 'active the membership' do
      expect_any_instance_of(Membership).to receive(:active!)
      Shipping::ShippingMembership.new(@order.items.first).dispatch_now
    end

    it 'send welcome mailer to the customer' do
      expect(Notifier::Mailer).to receive(:welcome_membership).with(@order.customer, @order.items.first)
      Shipping::ShippingMembership.new(@order.items.first).dispatch_now
    end
  end
end