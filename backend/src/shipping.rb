require_relative './shipping_methods/shipping_method'
require_relative './shipping_methods/physical_shipping'
require_relative './shipping_methods/book_shipping'
require_relative './shipping_methods/digital_shipping'
require_relative './shipping_methods/membership_shipping'

class Shipping

    def initialize(order)
        @order = order
    end

    def ship
        @order.items.each do |order_item|
            shipping_method = get_shipping_method(order_item.product.type)
            shipping_method.dispatch
        end
    end

    def get_shipping_method(product_type)
        shipping_method_mapping = {
            :book => BookShipping,
            :physical => PhysicalShipping,
            :digital => DigitalShipping,
            :membership => MembershipShipping
        }

        return shipping_method_mapping.values_at(product_type).first.new(@order.customer)
    end
end