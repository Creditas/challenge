require_relative '../product'
require_relative '../product_type'
require_relative '../shipping_helpers'

describe Membership do
  describe 'shipping method' do
    it 'activates membership' do
    end

    it 'sends emails' do

    end

    it 'returns string with positive status' do

    end

    it 'returns string with negative status' do

    end
  end
end

describe Physical do
  describe 'shipping method' do
    it 'generates ashipping label' do

    end

    it 'returns string with positive status' do

    end

    it 'returns string with negative status' do

    end
  end
end

describe Book do
  before(:each) do
    @foolano = Customer.new
    @book = Product.new(name: 'Awesome book', type: :book)
    @book_order = Order.new(@foolano)
    @book_order.add_product(@book)
    @shipping_descrip = ShippingDetails.new(@book_order)

    @book_ship = Book.shipping(@book, @book_order)
  end

  describe 'shipping method' do

    it 'has a disclaimer' do
    end

    it 'returns string with positive status' do

    end

    it 'returns string with negative status' do

    end
  end
end

describe Digital do
  describe 'shipping method' do
    it 'sends emails' do

    end

    it 'returns string with positive status' do

    end

    it 'returns string with negative status' do

    end
  end
end
