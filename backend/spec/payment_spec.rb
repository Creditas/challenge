require 'spec_helper'

describe Payment do
  before :each do
    foolano = Customer.new
    book = Product.new(name: 'Awesome book', type: :book)
    book_order = Order.new(foolano)
    book_order.add_product(book)
    @payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  end

  it "pays the Order associated to a payment" do
    paid_at = Time.now
    expect(@payment_book.order).to receive(:close).with(paid_at)

    @payment_book.pay(paid_at)
    expect(@payment_book.amount).to eq(10)
    expect(@payment_book.authorization_number).not_to be_nil
    expect(@payment_book.invoice).not_to be_nil
    expect(@payment_book.paid_at).to eq(paid_at)
  end

  it "returns true if the order is paid" do
    paid_at = Time.now

    @payment_book.pay(paid_at)
    expect(@payment_book.paid?).to be_truthy
  end
end
