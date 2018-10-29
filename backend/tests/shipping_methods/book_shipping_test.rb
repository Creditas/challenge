require 'test/unit'
require 'mocha/test_unit'
require_relative '../../src/shipping_methods/book_shipping'

class BookShippingTest < Test::Unit::TestCase

    def setup
        customer = mock()
        customer.stubs(:name).returns("Daryl Gellan")
        customer.stubs(:address).returns("23 Green Ridge Parkway")
        @shipping = BookShipping.new(customer)
    end

    def test_can_create_book_shipping        
        assert_instance_of(BookShipping, @shipping)
    end

    def test_can_print_shipping_label
        expectedlabel = "Daryl Gellan\n23 Green Ridge Parkway\n"
        expectedlabel += "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
        assert_equal(expectedlabel, @shipping.dispatch)
    end
end