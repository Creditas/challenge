module Shipping
  class ShippingPhysical
    def initialize(item)
      @item = item
      @shipping_label = ""
      generate_shipping_label
    end

    def dispatch_now 
      #Implements here the shipping_label print
      puts @shipping_label
    end

    private

    def generate_shipping_label
      shipping_label_header
      shipping_label_body
      shipping_label_footer
    end
    
    def shipping_label_header
      @shipping_label = "---------# S H I P P I N G    L A B E L #---------\n"
    end

    def shipping_label_body
      @shipping_label += "\t #{@item.order.customer} \n"
      @shipping_label += "\t #{@item.order.address.zipcode} \n"  
    end

    def shipping_label_footer
      @shipping_label += "------------------------------------------------------\n\n\n"
    end
  end
end