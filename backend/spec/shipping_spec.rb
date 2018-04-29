require 'spec_helper'

describe Shipping do
  before do
    foolano = Customer.new(name: "Gabriel", email: "gabrieljustware@gmail.com")
    order = Order.new(foolano)
    @payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  end

  it "ships a physical item" do
    physical_item = PhysicalItem.new(name: 'Awesome physical item', value: 10)
    @payment.order.add_item(physical_item)
    shipping = Shipping.new(@payment)

    expect(physical_item).to receive(:ship).with(@payment.order)
    shipping.ship
  end

  it "ships a membership item" do
    membership = Membership.new(name: "Assinatura do serviço creditas", customer: @payment.order.customer, value: 10)
    @payment.order.add_item(membership)
    shipping = Shipping.new(@payment)

    expect(membership).to receive(:ship).with(@payment.order)
    shipping.ship
  end

  it "ships a book item" do
    book = Book.new(name: 'Awesome book', value: 10)
    @payment.order.add_item(book)
    shipping = Shipping.new(@payment)

    expect(book).to receive(:ship).with(@payment.order)
    shipping.ship
  end

  it "ships a digital item" do
    digital_item = DigitalItem.new(name: 'Awesome digital item', value: 10)
    @payment.order.add_item(digital_item)
    shipping = Shipping.new(@payment)

    expect(digital_item).to receive(:ship).with(@payment.order)
    shipping.ship
  end
end
