require 'spec_helper'

describe Book do
  before do
    foolano = Customer.new(name: "Gabriel", email: "gabrieljustware@gmail.com")
    @order = Order.new(foolano)
  end

  it "ships a book item of an order" do
    book = Book.new(name: "Awesome book", value: 10)
    @order.add_item(book)

    ship = book.ship(@order)
    expect(ship).to eq("#{@order.address.zipcode} Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.")
  end
end
