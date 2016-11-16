require_relative '../order'
require_relative '../customer'
require_relative '../product'
require_relative '../order'
require_relative '../payment'
require_relative '../credit_card'

RSpec.describe Payment, "" do
=begin
    context "Testing the payment of a book" do
        it "should return item order book" do
            foolano = Customer.new
            book = Product.new(name: 'Awesome book', type: :book)
            book_order = Order.new(foolano)
            book_order.add_product(book)

            payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
            payment_book.pay

            expected_book = payment_book.order.items.first.product.type
            expect(expected_book).to be(:book)
        end

        it "should generate a shipping label to the same be put on the sending box" do
            foolano = Customer.new

            book = Product.new(name: 'Awesome book', type: :book)
            book_order = Order.new(foolano)
            book_order.add_product(book)

            payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
            payment_book.pay
            expected_book = payment_book.order.items.first.product.type

            expect(expected_book).to be(:book)
            expect(payment_book.shipping_label?).to be(true)
        end

    end
=end
    context "Testing a actvation of a service signature" do
        it "shoud activate the customer signature" do
            foolano = Customer.new

            service_signature = Product.new(name: 'Signature Service', type: :signature_service)
            signature_service_order = Order.new(foolano)
            signature_service_order.add_product(service_signature)

            payment_signature_service = Payment.new(order: signature_service_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
            payment_signature_service.pay

            expect(payment_signature_service.order.customer.membership.activated?).to be(true)
        end
    end

    context "Testing the physical item of a book" do


        it "should generate a shipping label when the product is physical item" do
            foolano = Customer.new

            physical_item = Product.new(name: 'Awesome physical Item', type: :physical_item)
            physical_item_order = Order.new(foolano)
            physical_item_order.add_product(physical_item)

            payment_physical_item = Payment.new(order: physical_item_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
            payment_physical_item.pay
            expected_physical_item = payment_physical_item.order.items.first.product.type

            expect(expected_physical_item).to be(:physical_item)
            expect(payment_physical_item.order.items.first.product.shipping_label?).to be(true)
        end

    end
end
