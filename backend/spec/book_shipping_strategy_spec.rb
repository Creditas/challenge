require_relative "../bootstrap.rb"

RSpec.describe "Invoking BookShippingStrategy methods" do

  it "should return shipping label for a book order" do
    @foolano = Customer.new
    @order = Order.new(@foolano)
    book = BookShippingStrategy.new

    expect(book.send(:generate_label, @order)).to include("ITEM ISENTO")

    expect(book).to receive(:shipping_label)
    book.shipping(@order)

  end

end
