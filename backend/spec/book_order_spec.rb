require_relative '../lib/bootstrap.rb'

describe 'when processing a book order' do

  before(:each) do
    @foolano = Customer.new('Name Test', 'customer@email.com')
    @book = Product.new('Awesome book', 'book')
    @book_order = Order.new(@foolano)
    @book_order.add_product(@book)
  end

  it 'should process the payment and send the shipping label' do
    payment_book = Payment.new(order: @book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment_book.pay

    expect(payment_book.paid?).to eq (true)
  end

end