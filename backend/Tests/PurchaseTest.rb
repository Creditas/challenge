require 'minitest/autorun'
require_relative '../Entities/Customer.rb'
require_relative '../Entities/Product.rb'
require_relative '../Strategy/Order.rb'
require_relative '../Strategy/PhysicalProductOrder.rb'
require_relative '../Strategy/ServiceSubscriptionOrder.rb'
require_relative '../Entities/Payment.rb'
require_relative '../ValueObjects/CreditCard.rb'
require_relative '../Strategy/DigitalProductOrder.rb'

class PurchaseProductTest < Minitest::Test

    def test_should_buy_a_book
        customer = Customer.new("João da Silva", "joao@silva.com")
        book = Product.new(name: 'Awesome book', type: :book)
        book_product_order = PhysicalProductOrder.new(customer)
        book_product_order.add_product(book)
        book_product_order.apply_payment(CreditCard.fetch_by_hashed('43567890-987654367'))
        book_product_order.post_payment
        book_product_order.close
               
        assert_instance_of(PhysicalProductOrder, book_product_order)     
        assert_equal(:book, book_product_order.items.first.product.type)
        assert_equal(true, book_product_order.payment.paid?)
        assert_equal(true, book_product_order.closed?)
    end
end