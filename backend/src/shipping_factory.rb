require_relative './shipping_methods/physical_shipping'
require_relative './shipping_methods/book_shipping'
require_relative './shipping_methods/digital_shipping'
require_relative './shipping_methods/membership_shipping'

class ShippingFactory
  def self.create(product_type, customer, item_list)
    shipping_method_mapping = {
      :book => BookShipping,
      :physical => PhysicalShipping,
      :digital => DigitalShipping,
      :membership => MembershipShipping
    }
    
    shipping_method = shipping_method_mapping.fetch(product_type)
    
    shipping_method.new(customer, item_list)
  end
end