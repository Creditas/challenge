require 'test/unit'
require 'mocha/test_unit'
require_relative '../../src/shipping_methods/shipping_method'
require_relative '../../src/shipping_methods/digital_shipping'
require_relative '../../src/voucher'

class DigitalShippingTest < Test::Unit::TestCase

    def setup
        voucher = mock()
        voucher.stubs(:to_s).returns("You can use the coupon 10OFF to get $ 10 off on your next purchase.")
        @customer = mock()
        @customer.stubs(:name).returns("Cindi Beisley")
        @customer.stubs(:email).returns("cbeisleye@eventbrite.com")
        @customer.stubs(:voucher=).returns(nil)
        @customer.stubs(:voucher).returns(voucher)
        @shipping = DigitalShipping.new(@customer)
    end

    def test_can_create_Digital_shipping
        assert_instance_of(DigitalShipping, @shipping)
    end

    def test_can_create_voucher
        assert_instance_of(Voucher, @shipping.create_voucher)
    end

    def test_can_create_notification_without_items
        expected_mail = "To: cbeisleye@eventbrite.com\n"
        expected_mail += "Subject: Thanks for your purchase, Cindi Beisley!\n"
        expected_mail += "Body: Hello, Cindi Beisley. \n"
        expected_mail += "Your order: \n"
        expected_mail += "You can use the coupon 10OFF to get $ 10 off on your next purchase."
        expected_mail += "\nRegards,"
        
        assert_equal(expected_mail, @shipping.mail_message)
    end

    def test_can_create_notification_with_items         
        item_list = "Album: Yellow Submarine (1969)\n"
        item_list += "Artist: The Beatles\n"
        item_list += "Price: $ 15\n"
        item_list += "--------------\n"
        item_list += "Album: Nevermind (1991)\n"
        item_list += "Artist: Nirvana\n"
        item_list += "Price: $ 9\n"
        item_list += "--------------\n"
        item_list += "Order total: $ 24\n"

        expected_mail = "To: cbeisleye@eventbrite.com\n"
        expected_mail += "Subject: Thanks for your purchase, Cindi Beisley!\n"
        expected_mail += "Body: Hello, Cindi Beisley. \n"
        expected_mail += "Your order: \n"
        expected_mail += "Album: Yellow Submarine (1969)\n"
        expected_mail += "Artist: The Beatles\n"
        expected_mail += "Price: $ 15\n"
        expected_mail += "--------------\n"
        expected_mail += "Album: Nevermind (1991)\n"
        expected_mail += "Artist: Nirvana\n"
        expected_mail += "Price: $ 9\n"
        expected_mail += "--------------\n"
        expected_mail += "Order total: $ 24\n"
        expected_mail += "You can use the coupon 10OFF to get $ 10 off on your next purchase."
        expected_mail += "\nRegards,"
        
        shipping = DigitalShipping.new(@customer, item_list)
        assert_equal(expected_mail, shipping.mail_message)
    end
    
end