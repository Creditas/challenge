require 'test/unit'
require 'mocha/test_unit'
require_relative '../src/shipping'

class ShippingFactoryTest < Test::Unit::TestCase
    
    def setup
        @mock_customer = mock()
        @factory = ShippingFactory.new
    end

    def test_can_get_shipping_method_for_books
        assert_instance_of(BookShipping, @factory.instance(:book, @mock_customer, ''))
    end

    def test_can_get_shipping_method_for_physical_item
        assert_instance_of(PhysicalShipping, @factory.instance(:physical, @mock_customer, ''))
    end

    def test_can_get_shipping_method_for_digital_item
        assert_instance_of(DigitalShipping, @factory.instance(:digital, @mock_customer, ''))
    end

    def test_can_get_shipping_method_for_digital_service
        assert_instance_of(MembershipShipping, @factory.instance(:membership, @mock_customer, ''))
    end
end
