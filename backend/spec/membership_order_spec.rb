require_relative '../lib/bootstrap.rb'

describe 'when processing a membership order' do

  before(:each) do 
    @foolano = Customer.new('Name Test', 'customer@email.com')
    @membership = Product.new('Gympass', 'membership')
    @membership_order = Order.new(@foolano)
    @membership_order.add_product(@membership)
  end

  it 'should process the payment' do
    payment_membership = Payment.new(order: @membership_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment_membership.pay

    expect(payment_membership.paid?).to eq (true)
  end
end

