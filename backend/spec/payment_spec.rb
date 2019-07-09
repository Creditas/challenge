require_relative '../bootstrap'

describe 'payment' do
    it 'is a book can pay with credit card' do
        book = Product.new( type: :book, name: 'Awesome book')
        customer = Customer.new
        book_order = Order.new(customer)
        credit_card = CreditCard.fetch_by_hashed('43567890-987654367')

        book_order.add_product(book)
        payment_book = Payment.new(order: book_order, payment_method: credit_card)
        payment_book.pay

        expect(payment_book.paid?).to be true
        expect(payment_book.order.items.first.product.type).to be :book
    end

end
