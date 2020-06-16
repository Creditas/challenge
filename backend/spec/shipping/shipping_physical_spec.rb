
require_relative '../../lib/config/load'

describe Shipping::ShippingPhysical do
  before do
    foolano = Customer.new( 'Foolano')
    @book = Product.new(name: 'Awesome book', type: :book)
    @physical = Product.new(name: 'Notebook', type: :physical)
    @digital = Product.new(name: 'Audio Book', type: :digital)
    @membership = Product.new(name: 'Subscription Book', type: :membership)
    @order = Order.new(foolano)
    @order.add_product(@physical)

  end

  it 'generate correct shipping label for a physical product' do
    expect(Printer::ShippingLabel).to receive(:new).with(@order.customer,@order.address).and_call_original
    Shipping::ShippingPhysical.new(@order.items.first).dispatch_now
  end
end