require_relative '../order'
require_relative '../customer'
require_relative '../product'
require_relative '../order'
require_relative '../payment'
require_relative '../credit_card'

RSpec.describe Payment, "Differents types of payments!" do

    context "Testing the payment of a book." do
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

            service_signature = Product.new(name: 'Signature Service', type: :membership)
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

    context "Testing the generation of a voucher" do

        it "should generate a voucher for the order of a digital product" do
            foolano = Customer.new

            digital = Product.new(name: 'Awesome physical', type: :digital)
            digital_order = Order.new(foolano)
            digital_order.add_product(digital)

            payment_digital = Payment.new(order: digital_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
            payment_digital.pay
            expected_digital = payment_digital.order.items.first.product.type

            expect(expected_digital).to be(:digital)
            expect(payment_digital.order.total_amount).to be(0)
            expect(!payment_digital.order.items.first.email.nil?).to be(true)
        end

    end
end
