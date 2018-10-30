require 'test/unit'
require 'mocha/test_unit'
require_relative '../src/shipping'

class ShippingFactoryTest < Test::Unit::TestCase
    
    def setup
        @mock_customer = mock()
    end

    def test_can_get_shipping_method_for_books
        assert_instance_of(BookShipping, ShippingFactory.create(:book, @mock_customer, ''))
    end

    def test_can_get_shipping_method_for_physical_item
        assert_instance_of(PhysicalShipping, ShippingFactory.create(:physical, @mock_customer, ''))
    end

    def test_can_get_shipping_method_for_digital_item
        assert_instance_of(DigitalShipping, ShippingFactory.create(:digital, @mock_customer, ''))
    end

    def test_can_get_shipping_method_for_digital_service
        assert_instance_of(MembershipShipping, ShippingFactory.create(:membership, @mock_customer, ''))
    end
end
