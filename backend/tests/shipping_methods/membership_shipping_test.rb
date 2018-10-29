require 'test/unit'
require 'mocha/test_unit'
require_relative '../../src/shipping_methods/membership_shipping'

class MembershipShippingTest < Test::Unit::TestCase

    def setup
        customer = mock()
        customer.stubs(:name).returns("Daryl Gellan")
        customer.stubs(:email).returns("jhamments5@bloglines.com")
        customer.stubs(:membership=).returns(true)
        @shipping = MembershipShipping.new(customer)
    end

    def test_can_create_membership_shipping        
        assert_instance_of(MembershipShipping, @shipping)
    end

    def test_can_create_notification
        expected_mail = "To: jhamments5@bloglines.com\n"
        expected_mail += "Subject: Thank you for subscribing, Daryl Gellan!\n"
        expected_mail += "Body: Welcome, Daryl Gellan. "
        expected_mail += "You can use your subscription right now clicking on the link below. "
        expected_mail += "Regards,"
        
        assert_equal(expected_mail, @shipping.get_mail_message)
    end

    def test_can_activate_membership
        assert_true(@shipping.activate_membership)
    end
    
end