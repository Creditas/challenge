require 'test/unit'
require_relative '../load'

class IntegrationTest < Test::Unit::TestCase

    def setup
        @customer = Customer.new(name: "Zachery Tissell", address: Address.new(zipcode: '6816'), email: "zachery@email.com")
        book_product = Product.new(name: 'Homo deus', type: :book, price: 47, attributes: {})
        physical_product = Product.new(name: 'Smartband Tway', type: :physical, price: 189, attributes: {})
        digital_product = Product.new(name: 'Exile On Main Street', type: :digital, price: 10, attributes: {
            :full_name => "Album: Exile On Main Street (1972)",
            :artist => "The Rolling Stones"
        })
        membership_product = Product.new(name: 'Wine Club', type: :membership, price: 120, attributes: {})
        order = Order.new(@customer)
        order.add_product(book_product)
        order.add_product(physical_product)
        order.add_product(digital_product)
        order.add_product(membership_product)

        payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
        payment.pay

        @shipping = Shipping.new(order)
        @shipping.ship
    end

    def test_can_buy_multiple_items
        @shipping.order.items.each do |order_item|
            assert(order_item.shipped)

            if (order_item.product.type == :book)
                expected_result = "Zachery Tissell\n2 Riverside Lane\nItem isento de impostos conforme disposto na Constituição Art. 150, VI, d."                
            end
            if (order_item.product.type == :physical)
                expected_result = "Zachery Tissell\n2 Riverside Lane\n"
            end
            if (order_item.product.type == :digital)
                expected_result = "To: zachery@email.com\nSubject: Thanks for your purchase, Zachery Tissell!\nBody: Hello, Zachery Tissell. \nYour order: \nAlbum: Exile On Main Street (1972)\nThe Rolling Stones\nPrice: $ 10\n--------------\nOrder total: $ 10\nYou can use the coupon 10OFF to get $ 10 off on your next purchase.\nRegards,"
                assert_instance_of(Voucher, @customer.voucher)
                assert_equal("10", @customer.voucher.discount_value)
            end
            if (order_item.product.type == :membership)
                expected_result = "To: zachery@email.com\nSubject: Thank you for subscribing, Zachery Tissell!\nBody: Welcome, Zachery Tissell. You can use your subscription right now clicking on the link below. Regards,"
                assert(@customer.membership.active?)
            end

            assert_equal(expected_result, order_item.shipping_log)
        end        
    end
end
