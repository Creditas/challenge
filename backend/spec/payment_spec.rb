require_relative '../bootstrap'

describe 'payment' do
    it 'allows to pay books with credit card' do
        book = Product.new( type: :book, name: 'Awesome book')
        customer = Customer.new
        book_order = Order.new(customer)
        credit_card = CreditCard.fetch_by_hashed('43567890-987654367')
        paid = true

        book_order.add_product(book)
        payment_book = Payment.new(order: book_order, payment_method: credit_card)
        payment_book.pay

        expect(payment_book.paid?).to be paid
        expect(payment_book.order.items.first.product.type).to be :book
    end

    it 'generates a shipping label if payment is for a physical item' do
        physical = Product.new(type: :physical, name: 'Awesome physical')
        customer = Customer.new
        physical_order = Order.new(customer)
        credit_card = CreditCard.fetch_by_hashed('43567890-987654367')
        generate = true

        physical_order.add_product(physical)
        payment_physical = Payment.new(order: physical_order, payment_method: credit_card)
        payment_physical.pay

        expect(payment_physical.result.shipping_label?).to be generate
    end

end
