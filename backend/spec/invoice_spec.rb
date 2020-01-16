require 'rspec'
require_relative '../src/domain/invoice'
require_relative '../src/domain/order'
require_relative '../src/domain/customer'
require_relative '../src/domain/payment_method'
require_relative '../src/domain/product'
require_relative '../src/infrastructure/address_repository'

describe Invoice, '#total_price' do
  context 'with a 3 products order costing 20.00 each' do

    it 'does a total 60,00' do

      book = Product.new(1, 'Clojure for the brave and true', :book, 20.00)
      customer = Customer.new('foolano', 'foolano@github.io')

      address = Address.new(customer, '11730-000')
      order = Order.new(customer, address)
      order.add_product(book)
      order.add_product(book)
      order.add_product(book)

      invoice = Invoice.new(order, address)

      expect(invoice.total_price).to be(60.00)
    end
  end
end