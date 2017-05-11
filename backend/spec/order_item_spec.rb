require_relative '../customer'
require_relative '../product'
require_relative '../order'
require_relative '../order_item'

describe OrderItem do
  before(:each) do
    @foolano = Customer.new
    @book = Product.new(name: 'Awesome book', type: :book)
    @book_order = Order.new(@foolano)
    @book_order_item = OrderItem.new(order: @book_order, product: @book)
  end

  describe 'initializes with order and product' do
    it 'has an order' do
      expect(@book_order_item.order.class).to be Order
    end

    it 'has a product and can access attributes of the product' do
      expect(@book_order_item.product.class).to be Product
      expect(@book_order_item.product.type).to eq :book

    end
  end

    describe 'has a total amount of 10' do

    it 'in already declared objects' do
      expect(@book_order_item.total).to eq 10
    end

    it 'in totally new objects' do
      expect(OrderItem.new(order: Order.new(@foolano), product: Product.new(name: 'The coolest book', type: :book)).total).to eq 10
    end
  end



end
