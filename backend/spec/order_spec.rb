require_relative '../payment'
require_relative '../customer'
require_relative '../product'
require_relative '../order'
require_relative '../order_item'
require_relative '../invoice'

describe Order do
  before(:each) do
    @foolano = Customer.new
    @book = Product.new(name: 'Awesome book', type: :book)
    @address = Address.new(zipcode:'05654-050')
    @book_order = Order.new(@foolano)
    @invoice = Invoice.new(billing_address: @address , shipping_address: @address, order: @book_order )
    @book_order.add_product(@book)
    @order_item = OrderItem.new(order: @book_order, product: @book)
  end

  describe 'attributes' do
    it 'has a customer' do
      
    end

    it 'has an order item class' do

    end

    it 'has an address' do

    end
  end

  describe 'adds products' do
    it 'can add products to items array' do

    end

    it 'calculates total amount' do

    end
  end

  describe 'closes the order' do

    it 'can close the order' do

    end

    it 'shows when the order was closed' do

    end
  end
end

describe Address do
  before(:each) do
    @address = Address.new(zipcode:'05654-050')
  end

  describe 'attributes' do
    it 'has a zipcode in string form' do
      expect(@address.zipcode).to eq '05654-050'
      expect(@address.zipcode.class).to be String
    end
  end
end


describe CreditCard do
  before(:each) do
    @credit_card = CreditCard.fetch_by_hashed('43567890-987654367'))
  end

  describe 'initialization' do
    it 'initializes by code' do
      expect(@credit_card.class).to be CreditCard
    end
  end

end
