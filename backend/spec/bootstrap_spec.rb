require 'bootstrap'


RSpec.describe Shipment, "#ship" do
  context "shipping membership product" do 
    it "activates customer's membership" do
      foolano = Customer.new(name: 'foolano', email: 'fool@no.com')
      product = Product.new(name: 'membership', type: :membership)
      an_order = Order.new(foolano)
      an_order.add_product(product)
      payment_order = Payment.new(order: an_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
      payment_order.pay
      shipment_payment = Shipment.new(payment: payment_order)
      shipment_payment.deliver
      expect(foolano.memberships.last.product).to eq product
      expect(foolano.memberships.last.is_active?)
    end
  end

  context "shipping digital product" do 
    it "gives voucher of R$10" do
      foolano = Customer.new(name: 'foolano', email: 'fool@no.com')
      product = Product.new(name: 'file', type: :digital)
      an_order = Order.new(foolano)
      an_order.add_product(product)
      payment_order = Payment.new(order: an_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
      payment_order.pay
      shipment_payment = Shipment.new(payment: payment_order)
      shipment_payment.deliver
      expect(foolano.vouchers.last.value).to eq 10
    end
  end
end

      
