class ShippingMethod

    def initialize(customer)
        @customer = customer
    end

    def dispatch
        raise "Not implemented."
    end
end