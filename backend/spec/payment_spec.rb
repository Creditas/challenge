require_relative '../payment'
require_relative '../customer'
require_relative '../product'
require_relative '../order'
require_relative '../order_item'
require_relative '../invoice'

describe Payment do
  before(:each) do
    @foolano = Customer.new
    @book = Product.new(name: 'Awesome book', type: :book)
    @address = Address.new(zipcode:05654050)
    @book_order = Order.new(@foolano)
    @invoice = Invoice.new(billing_address: @address , shipping_address: @address, order: @book_order )
    @book_order.add_product(@book)
    @payment_book = Payment.new(order: @book_order, invoice: @invoice, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  end

  describe 'attributes' do
    it 'has a payment method' do
      expect(@payment_book.payment_method.empty?).to be false
    end

    it 'has an order' do
      expect(@payment_book.order).to eq @book_order
    end

    it 'has an invoice' do
      expect(@payment_book.invoice).to eq @invoice
    end

    it 'has an authorization number and amount' do
      expect(@payment_book).to have_attributes(authorization_number: nil, amount: nil )
    end
  end

  describe 'it can be paid, or not' do
    it 'is not paid' do
      expect(@payment_book.paid?).to be false
    end

    it 'is paid' do
      @payment_book.pay
      expect(@payment_book.paid?).to be true
    end
  end

end

describe Payment do
  before(:each) do
    @foolano = Customer.new
    @book = Product.new(name: 'Awesome book', type: :book)
    @address = Address.new(zipcode:05654050)
    @book_order = Order.new(@foolano)
    @invoice = Invoice.new(billing_address: @address , shipping_address: @address, order: @book_order )
    @book_order.add_product(@book)
    @payment_book = Payment.new(order: @book_order, invoice: @invoice, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  end

  describe 'attributes' do
    it 'has a payment method' do
      expect(@payment_book.payment_method.empty?).to be false
    end

    it 'has an order' do
      expect(@payment_book.order).to eq @book_order
    end

    it 'has an invoice' do
      expect(@payment_book.invoice).to eq @invoice
    end

    it 'has an authorization number and amount' do
      expect(@payment_book).to have_attributes(authorization_number: nil, amount: nil )
    end
  end

  describe 'it can be paid, or not' do
    it 'is not paid' do
      expect(@payment_book.paid?).to be false
    end

    it 'is paid' do
      @payment_book.pay
      expect(@payment_book.paid?).to be true
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

  describe 'generates shipping details for each product type as an attribute' do
    before do
      @description_arr = @shipping_descrip.status
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
