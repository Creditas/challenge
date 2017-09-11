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

    def test_should_buy_a_physical_product
        customer = Customer.new("João da Silva", "joao@silva.com")
        product = Product.new(name: 'Awesome CD', type: :physical)
        physical_product_order = PhysicalProductOrder.new(customer)
        physical_product_order.add_product(product)
        physical_product_order.apply_payment(CreditCard.fetch_by_hashed('43567890-987654367'))
        physical_product_order.post_payment
        physical_product_order.close
               
        assert_instance_of(PhysicalProductOrder, physical_product_order)     
        assert_equal(:physical, physical_product_order.items.first.product.type)
        assert_equal(true, physical_product_order.payment.paid?)
        assert_equal(true, physical_product_order.closed?)
    end

    def test_should_subscribe_a_service
        customer = Customer.new("João da Silva", "joao@silva.com")
        product = Product.new(name: 'Video Streaming', type: :service)
        service_product_order = ServiceSubscriptionOrder.new(customer)
        service_product_order.add_product(product)
        service_product_order.apply_payment(CreditCard.fetch_by_hashed('43567890-987654367'))
        service_product_order.post_payment
        service_product_order.close
               
        assert_instance_of(ServiceSubscriptionOrder, service_product_order)     
        assert_equal(:service, service_product_order.items.first.product.type)
        assert_equal(true, service_product_order.payment.paid?)
        assert_equal(true, service_product_order.closed?)
    end
  
    def test_should_buy_a_digital_product
        customer = Customer.new("João da Silva", "joao@silva.com")
        product = Product.new(name: 'Awesome Digital CD', type: :digital)
        digital_product_order = DigitalProductOrder.new(customer)
        digital_product_order.add_product(product)
        digital_product_order.apply_payment(CreditCard.fetch_by_hashed('43567890-987654367'))
        digital_product_order.post_payment
        digital_product_order.close
               
        assert_instance_of(DigitalProductOrder, digital_product_order)     
        assert_equal(:digital, digital_product_order.items.first.product.type)
        assert_equal(true, digital_product_order.payment.paid?)
        assert_equal(true, digital_product_order.closed?)
    end

end