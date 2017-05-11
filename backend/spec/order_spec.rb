require_relative '../customer'
require_relative '../product'
require_relative '../product_type'
require_relative '../order'
require_relative '../order_item'

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
    before {@membership_product = Product.new(name: "Super membership", type: :book) }

    it 'adds products to items array' do
      expect(@book_order.items.length).to eq 1

      @book_order.add_product(@membership_product)

      expect(@book_order.items.length).to eq 2
      expect(@book_order.items.last.product).to eq @membership_product
    end

    it 'calculates total amount' do
      expect(@book_order.total_amount).to eq 10

      @book_order.add_product(@membership_product)
      expect(@book_order.total_amount).to eq 20
    end
  end

  describe 'closes the order' do

    it 'can close the order' do
      expect(@book_order.closed_at).to eq nil

      expect(@book_order.close).to eq @book_order.closed_at
    end

    it 'shows when the order was closed' do
      @book_order.close
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

  describe 'fetch by hashed' do
    it 'initializes when it\'s fetch by hashed' do
      expect(@credit_card.class).to be CreditCard
    end
  end
end

describe ShippingDetails do
  before(:each) do
    @foolano = Customer.new
    @book = Product.new(name: 'Awesome book', type: :book)
    @membership_product = Product.new(name: "Super membership", type: :membership)
    @order = Order.new(@foolano)
    @order.add_product(@book)
    @order.add_product(@membership_product)
    @shipping_descrip = ShippingDetails.new(@order)
  end

  describe 'has the order\'s products' do
    it 'generates an array of all the products in an order' do
      products = @shipping_descrip.get_products
      expect(products).to eq [@book, @membership_product]
    end
  end

  describe 'generates shipping details for each product type' do
    before do
      @description_arr = @shipping_descrip.description
    end

    it 'generates an array of strings with shiping details for the shipping label' do
      expect(@description_arr.all? {|item| item.is_a?(String) }).to be true
      expect(@description_arr.class).to be Array
    end

    it 'has unique instructions' do
      unique_description = @description_arr.uniq
      expect(unique_description == @description_arr).to be true
    end
  end
end
