require 'test/unit'
require 'mocha/test_unit'
require_relative '../src/shipping'

class ShippingTest < Test::Unit::TestCase
    
    def setup
        mockCustomer = mock()
        @mockOrder = mock()
        @mockOrder.stubs(:customer).returns(mockCustomer)
    end

    def test_can_create_shipping
        assert_instance_of(Shipping, Shipping.new(@mockOrder))
    end

    def test_can_get_shipping_method_for_books
        shipping = Shipping.new(@mockOrder)
        shipping_method = shipping.get_shipping_method(:book)
        assert_instance_of(BookShipping, shipping_method)
    end

    def test_can_get_shipping_method_for_physical_item
        shipping = Shipping.new(@mockOrder)
        shipping_method = shipping.get_shipping_method(:physical)
        assert_instance_of(PhysicalShipping, shipping_method)
    end

    def test_can_get_shipping_method_for_digital_item
        shipping = Shipping.new(@mockOrder)
        shipping_method = shipping.get_shipping_method(:digital)
        assert_instance_of(DigitalShipping, shipping_method)
    end

    def test_can_get_shipping_method_for_digital_service
        shipping = Shipping.new(@mockOrder)
        shipping_method = shipping.get_shipping_method(:membership)
        assert_instance_of(MembershipShipping, shipping_method)
    end
end