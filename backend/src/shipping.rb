require_relative './shipping_methods/physical_shipping'
require_relative './shipping_methods/book_shipping'
require_relative './shipping_methods/digital_shipping'
require_relative './shipping_methods/membership_shipping'

class Shipping
    attr_reader :order

    def initialize(order)
        @order = order
    end

    def ship
        @order.items.each do |order_item|
            shipping_method = get_shipping_method(order_item.product.type)
            order_item.shipped!
            order_item.shipping_log = shipping_method.dispatch
        end
    end

    def get_shipping_method(product_type)
        shipping_method_mapping = {
            :book => BookShipping,
            :physical => PhysicalShipping,
            :digital => DigitalShipping,
            :membership => MembershipShipping
        }

        shipping_method = shipping_method_mapping.fetch(product_type)

        shipping_method.new(@order.customer, get_item_list)
    end

    def get_item_list
        list = ""
        total = 0
        @order.items.each do |order_item|
            if order_item.product.type == :digital
                list += order_item.product.to_s
                total += order_item.product.price
            end
        end
        list += "Order total: $ " + total.to_s + "\n"

        list
    end
end