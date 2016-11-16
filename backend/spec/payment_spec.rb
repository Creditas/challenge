require_relative '../order'
require_relative '../customer'
require_relative '../product'
require_relative '../order'
require_relative '../payment'
require_relative '../credit_card'

RSpec.describe Payment, "" do

    context "Testing the payment of a " do
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

        it "should generate a shipping label and a notification" do
            foolano = Customer.new

            book = Product.new(name: 'Awesome book', type: :book)
            book_order = Order.new(foolano)
            book_order.add_product(book)

            payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
            payment_book.pay
            expected_book = payment_book.order.items.first.product.type

            expect(expected_book).to be(:book)
            expect(payment_book.order.items.first.product.shipping_label?).to be(true)
            expect(payment_book.order.items.first.product.notification).to eq("This item is free from charges according to Constituição Art. 150, VI, d.")
        end

    end

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

            physical = Product.new(name: 'Awesome physical Item', type: :physical)
            physical_order = Order.new(foolano)
            physical_order.add_product(physical)

            payment_physical = Payment.new(order: physical_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
            payment_physical.pay
            expected_physical = payment_physical.order.items.first.product.type

            expect(expected_physical).to be(:physical)
            expect(payment_physical.order.items.first.product.shipping_label?).to be(true)
        end

    end
end
