require 'minitest/autorun'
require_relative '../Domain/Order.rb'
require_relative '../Domain/Order.rb'

class MockProduct
    def initialize
        @name = 'This is just a mock'
    end
end

class OrderTest < Minitest::Test
    def test_should_addAnProduct
        @order = Order.new
        @order.add_product(MockProduct.new)
        
        assert_equal       
    end
end