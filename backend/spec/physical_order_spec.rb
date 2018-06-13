require_relative '../lib/bootstrap.rb'

describe 'when processing a physical order' do

  before(:each) do 
    @foolano = Customer.new('Name Test', 'customer@email.com')
    @physical = Product.new('Some product', 'physical')
    @physical_order = Order.new(@foolano)
    @physical_order.add_product(@physical)
  end

  it 'should process the payment' do
    payment_physical = Payment.new(order: @physical_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment_physical.pay

    expect(payment_physical.paid?).to eq (true)
  end
end
