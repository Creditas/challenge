module Printer
  class ShippingLabel
    def initialize(customer, address, opts = {})
      @customer = customer
      @address = address
      @opts = opts
      @shipping_label = ""
      generate_shipping_label
    end

    def print
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
      @shipping_label += "\t #{@customer} \n"
      @shipping_label += "\t #{@address.zipcode} \n"
      @opts.each do |key, value|
        @shipping_label += "\t #{key}: #{value} \n"
      end
    end

    def shipping_label_footer
      @shipping_label += "------------------------------------------------------\n\n\n"
    end
  end
end