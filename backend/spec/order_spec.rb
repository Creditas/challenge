require 'rspec'
require_relative '../src/domain/order'
require_relative '../src/domain/address'
require_relative '../src/domain/product'
require_relative '../src/domain/customer'
require_relative '../src/domain/payment_method'

describe Order, '#total_amount' do

  context 'with 3 books and 1 physical product' do
    before do
      book = Product.new(1, 'Clojure for the brave and true', :book, 20.00)
      physical_product = Product.new(2, 'Otamatone from Maywa Denki', :physical, 45.00)
      customer = Customer.new('foolano', 'foolano@github.io')

      @order = Order.new(customer, Address.new(customer, '11730-000'))
      @order.add_product(book)
      @order.add_product(book)
      @order.add_product(physical_product)
    end

    it 'does 3 have total items' do
      expect(@order.total_amount).to be(3)
    end
  end

end