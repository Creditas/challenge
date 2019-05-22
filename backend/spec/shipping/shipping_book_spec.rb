
require_relative '../../lib/config/load'

describe Shipping::ShippingBook do
  before do
    foolano = Customer.new( 'Foolano')
    @book = Product.new(name: 'Awesome book', type: :book)
    @physical = Product.new(name: 'Notebook', type: :physical)
    @digital = Product.new(name: 'Audio Book', type: :digital)
    @membership = Product.new(name: 'Subscription Book', type: :membership)
    @order = Order.new(foolano)
    @order.add_product(@book)
    @opts = {
      Obs: 'Produto isento de impostos conforme disposto na Constituição Art. 150, VI, d'  
    }
  end

  it 'generate correct shipping label for a book' do
    expect(Printer::ShippingLabel).to receive(:new).with(@order.customer,@order.address, @opts).and_call_original
    Shipping::ShippingBook.new(@order.items.first).dispatch_now
  end
end