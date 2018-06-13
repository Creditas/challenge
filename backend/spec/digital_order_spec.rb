require_relative '../lib/bootstrap.rb'

describe 'when processing a digital order' do

  before(:each) do 
    @foolano = Customer.new('Name Test', 'customer@email.com')
    @music = Product.new('Music', 'digital')
    @digital_order = Order.new(@foolano)
    @digital_order.add_product(@music)
  end

  it 'should process the payment' do 
    payment_music = Payment.new(order: @digital_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment_music.pay

    expect(payment_music.paid?).to eq (true)
  end
end