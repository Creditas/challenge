class ShippingMethod

    def initialize(customer, item_list = "")
        @customer = customer
        @item_list = item_list
    end

    def dispatch
        raise "Not implemented."
    end
end
