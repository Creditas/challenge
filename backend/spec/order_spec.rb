require 'rspec'
require 'require_all'
require_all 'lib'

RSpec.describe Order do
  context "order flow" do
    it "can create order with digital product" do
      product = Product.new(name: 'Music: The Unforgiven - Metallica', price: 18.00, type: :digital)
      customer = Customer.new(name: 'Beltrano', email: 'beltrano.silva@creditas.com.br')
      order = Order.new(customer)
      order.add_product(product)

      billing_address = Address.new(street: 'Rua bento Salves' ,zipcode: '45678-979')
      shipping_address = Address.new(street: 'Rua Marques de Lages', zipcode: '04162-001')

      order.add_billing_address(billing_address)
      order.add_shipping_address(shipping_address)

      expect(order.customer).to eq customer
      expect(order.billing_address).to eq billing_address
      expect(order.shipping_address).to eq shipping_address
    end

    it "check if handle order item with digital product" do
      digital = Product.new(name: 'Music: The Unforgiven - Metallica', price: 18.00, type: :digital)
      customer = Customer.new(name: 'Beltrano', email: 'beltrano.silva@creditas.com.br')
      order = Order.new(customer)
      order.add_product(digital)

      expect(order.items.first.product.type).to eq :digital
      expect(order.items.first.class).to eq DigitalOrderItem
    end

    it "should get order price" do
      beltrano = Customer.new(name: 'Beltrano', email: 'beltrano.silva@creditas.com.br')
      xbox = ProductFactory::create(name: 'Console Xbox One', price: 1820.00,type: :physical)
      digital = ProductFactory::create(name: 'Music: The Unforgiven - Metallica', price: 18.00, type: :digital)
      membership = ProductFactory::create(name: 'Monthly Internet 100MB', price: 87.90,type: :membership)
      book = ProductFactory::create(name: 'Domain-Driven Design: Tackling Complexity in the Heart of Software', price: 58.00, type: :book)

      order = Order.new(beltrano)
      order.add_billing_address(Address.new(street: 'Rua bento Salves' ,zipcode: '45678-979'))
      order.add_shipping_address(Address.new(street: 'Rua Marques de Lages', zipcode: '04162-001'))
      order.add_product(xbox)
      order.add_product(membership)
      order.add_product(digital)
      order.add_product(book)


      expect(order.total_amount).to eq 1983.90
    end

  end
end

