require 'test/unit'
require 'mocha/test_unit'
require_relative '../../src/shipping_methods/digital_shipping'

class DigitalShippingTest < Test::Unit::TestCase

    def setup
        customer = mock()
        customer.stubs(:name).returns("Cindi Beisley")
        customer.stubs(:email).returns("cbeisleye@eventbrite.com")
        @shipping = DigitalShipping.new(customer)
    end

    def test_can_create_Digital_shipping        
        assert_instance_of(DigitalShipping, @shipping)
    end

    def test_can_create_notification
        expected_mail = "To: cbeisleye@eventbrite.com\n"
        expected_mail += "Subject: Thanks for your purchase, Cindi Beisley!\n"
        expected_mail += "Body: Hello, Cindi Beisley. "
        expected_mail += "Your order: "
        expected_mail += "\nRegards,"
        
        assert_equal(expected_mail, @shipping.get_mail_message)
    end
    
end