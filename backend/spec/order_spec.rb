require_relative '../customer'
require_relative '../product'
require_relative '../order'
require_relative '../order_item'
require_relative '../invoice'

describe Order do
  before(:each) do
    @foolano = Customer.new
    @book = Product.new(name: 'Awesome book', type: :book)
    @order_item = OrderItem.new(order: @book_order, product: @book)
    @book_order = Order.new(@foolano)
    @book_order.add_product(@book)
  end

  describe 'has readable attributes' do
    it 'has a customer and an address' do
      expect(@book_order).to have_attributes(customer: @foolano)
    end

    it 'has an address' do
      expect(@book_order.address.class).to be Address
    end
  end

  describe 'has various products' do
    let(:membership) { Product.new(name: "Super membership", type: :membership) }

    it 'adds products to items array' do
      expect(@book_order.items.length).to eq 1

      @book_order.add_product(:membership)

      expect(@book_order.items.length).to eq 2
      expect(@book_order.items.last.product).to eq :membership
    end

    it 'calculates total amount' do
      expect(@book_order.total_amount).to eq 10

      @book_order.add_product(:membership)
      expect(@book_order.total_amount).to eq 20
    end
  end

  describe 'closes the order' do

    it 'can close the order' do
      expect(@book_order.closed_at).to eq nil

      expect(@book_order.close).to eq @book_order.closed_at
    end

    it 'shows when the order was closed' do
      @book_order.closeo  
      expect(@book_order.closed_at.class).to be Time
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
    @credit_card = CreditCard.fetch_by_hashed('43567890-987654367')
  end

  describe 'initialization' do
    it 'initializes by code' do
      expect(@credit_card.class).to be CreditCard
    end
  end
end
