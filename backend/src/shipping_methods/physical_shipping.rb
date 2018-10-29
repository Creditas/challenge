require_relative './shipping_method'

class PhysicalShipping < ShippingMethod

    def dispatch
        print_shipping_label
    end

    def label_observations
        ''
    end

    def print_shipping_label
        label = @customer.name + "\n"
        label += @customer.address.to_s + "\n"
        label += label_observations

        label
    end
end