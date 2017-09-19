require 'rspec'
require 'require_all'
require_all 'lib'

RSpec.describe Order, "#order" do
  context "order flow" do
    it "can create full order" do
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

    it "check handle order item" do
      digital = Product.new(name: 'Music: The Unforgiven - Metallica', price: 18.00, type: :digital)
      customer = Customer.new(name: 'Beltrano', email: 'beltrano.silva@creditas.com.br')
      order = Order.new(customer)
      order.add_product(digital)

      expect(order.items.first.product.type).to eq :digital
      expect(order.items.first.class).to eq DigitalOrderItem
    end

  end
end

