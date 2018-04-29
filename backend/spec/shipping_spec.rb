require 'spec_helper'

describe Shipping do
  before do
    foolano = Customer.new(name: "Gabriel", email: "gabrieljustware@gmail.com")
    order = Order.new(foolano)
    @payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  end

  it "ships a membership item" do
    membership = Membership.new(name: "Assinatura do serviço creditas", customer: @payment.order.customer, value: 10)
    @payment.order.add_item(membership)
    shipping = Shipping.new(@payment)

    expect(membership).to receive(:ship).with(@payment.order)
    shipping.ship
  end
end
