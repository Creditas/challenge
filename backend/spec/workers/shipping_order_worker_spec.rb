
require_relative '../../lib/config/load'

describe Workers::ShippingOrderWorker do
  before do
    foolano = Customer.new( 'Foolano')
    @book = Product.new(name: 'Awesome book', type: :book)
    @physical = Product.new(name: 'Notebook', type: :physical)
    @digital = Product.new(name: 'Audio Book', type: :digital)
    @membership = Product.new(name: 'Subscription Book', type: :membership)
    @order = Order.new(foolano)
  end

  it 'dispatch the items' do
    @order.add_product(@book)
    item = @order.items.last
    expect_any_instance_of(Shipping::ShippingItem).to receive(:dispatch)
    Workers::ShippingOrderWorker.perform(@order)
  end
end