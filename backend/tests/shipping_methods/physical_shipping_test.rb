require 'test/unit'
require 'mocha/test_unit'
require_relative '../../src/shipping_methods/physical_shipping'

class PhysicalShippingTest < Test::Unit::TestCase

    def setup
        customer = mock()
        customer.stubs(:name).returns("Allison Born")
        customer.stubs(:address).returns("5338 Springview Lane")
        @shipping = PhysicalShipping.new(customer)
    end

    def test_can_create_physical_shipping        
        assert_instance_of(PhysicalShipping, @shipping)
    end

    def test_can_print_shipping_label
        expected_label = "Allison Born\n5338 Springview Lane\n"
        assert_equal(expected_label, @shipping.dispatch)
    end
end
