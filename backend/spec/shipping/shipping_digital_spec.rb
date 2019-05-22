
require_relative '../../lib/config/load'

describe Shipping::ShippingDigital do
  describe "Shipping::ShippingItem" do
    before do
      foolano = Customer.new( 'Foolano')
      @book = Product.new(name: 'Awesome book', type: :book)
      @physical = Product.new(name: 'Notebook', type: :physical)
      @digital = Product.new(name: 'Audio Book', type: :digital)
      @membership = Product.new(name: 'Subscription Book', type: :membership)
      @order = Order.new(foolano)
      @order.add_product(@digital)
    end
    
    it 'send new product available to the customer' do
      expect(Notifier::Mailer).to receive(:available_product).with(@order.items.first)
      Shipping::ShippingDigital.new(@order.items.first).dispatch_now
    end

    it 'send voucher to the customer' do
      expect(Notifier::Mailer).to receive(:voucher).with(@order.customer, 10)
      Shipping::ShippingDigital.new(@order.items.first).dispatch_now
    end
  end
end